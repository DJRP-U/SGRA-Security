import pytest
from app.models.proyecto import Proyecto
from app.models.enums.estado_proyecto_enum import TipoProyecto, EstadoProyecto, EstadoActualProyecto
from app.models.cuenta import Cuenta, EstadoCuentaEnum
from app.models.solicitud_cuenta import SolicitudCuenta, EstadoSolicitudEnum
from datetime import date
from app.models.cuenta_proyecto import CuentaProyecto

def test_permission_enforcement(client, auth_header, test_user, db):
    # 1. Setup: Project
    proj = Proyecto(
        codigo="PERM-001",
        nombre="Proyecto Permisos",
        descripcion="Desc",
        fecha_inicio=date.today(),
        fecha_fin=date.today(),
        tipo=TipoProyecto.WEB,
        estado=EstadoProyecto.ACTIVO,
        estado_actual=EstadoActualProyecto.PLANIFICACION
    )
    db.add(proj)
    db.commit()
    db.refresh(proj)

    # 2. Add test_user to project (owner/creator usually has permissions, but we want to test specific role assignment)
    # However, let's create a NEW user to be the subject of our tests to ensure clean state
    
    # Create User 2
    user2 = Cuenta(estadoCuenta=EstadoCuentaEnum.ACTIVO, rol_id=test_user.rol_id)
    db.add(user2)
    db.commit()
    db.refresh(user2)

    solicitud2 = SolicitudCuenta(
        nombre="Perm",
        apellido="User",
        correo="permuser@example.com",
        contrasena="pass",
        estado=EstadoSolicitudEnum.APROBADO,
        cuenta_id=user2.id
    )
    db.add(solicitud2)
    db.commit()
    
    # Add User 2 to Project
    cp2 = CuentaProyecto(cuenta_id=user2.id, proyecto_id=proj.id)
    db.add(cp2)
    db.commit()

    # Authenticate as User 2
    login_payload = {"username": "permuser@example.com", "password": "pass.password"} # assuming default mock logic or simple pass
    # Wait, the `test_user` fixture usually handles auth for the primary user. 
    # We need to manually login as user2 or mock the token.
    # Let's rely on the `client` and `auth_header` for the main user if possible, 
    # OR better, just use the `auth_token` creation if available.
    
    # Actually, let's look at how `auth_header` is created in `conftest.py`.
    # Based on previous context, I might not have easy access to `create_access_token` in tests unless imported.
    from app.core.security import create_access_token
    token = create_access_token(subject=str(user2.id))
    auth_header_user2 = {"Authorization": f"Bearer {token}"}

    # 3. Create Permission "historia:" required by ejemplo_controller
    # Check if it exists first
    perm_payload = {
        "nombre": "historia:",
        "descripcion": "Permiso para historia"
    }
    # We need to use admin/authorized user to create permission. `test_user` should be fine.
    
    # Try creating it. If it exists it might fail 400, which is fine, we just need it to exist.
    client.post("/rol-proyectos/permiso", json=perm_payload, headers=auth_header)
    
    # Get the permission UUID
    response = client.get("/rol-proyectos/", headers=auth_header)
    permisos = response.json()["data"]
    target_perm = next((p for p in permisos if p["nombre"] == "historia:"), None)
    assert target_perm is not None
    perm_uuid = target_perm["uuid"]

    # 4. Create Role WITH permission
    role_with_perm_payload = {
        "nombre": "Role With Perm",
        "descripcion": "Has permission",
        "permisos_uuids": [perm_uuid],
        "proyecto_uuid": str(proj.uuid)
    }
    response = client.post("/rol-proyectos/", json=role_with_perm_payload, headers=auth_header)
    assert response.status_code == 200 # or 201
    role_with_perm_uuid = response.json()["data"]["uuid"]

    # 5. Create Role WITHOUT permission
    role_no_perm_payload = {
        "nombre": "Role No Perm",
        "descripcion": "No permission",
        "permisos_uuids": [],
        "proyecto_uuid": str(proj.uuid)
    }
    response = client.post("/rol-proyectos/", json=role_no_perm_payload, headers=auth_header)
    assert response.status_code == 200 # or 201
    role_no_perm_uuid = response.json()["data"]["uuid"]

    # ==========================================
    # SCENARIO 1: User has NO role
    # ==========================================
    # Try to access protected resource
    payload_ejemplo = {"nombre": "Test 1"}
    response = client.post(f"/ejemplos/?proyecto_uuid={proj.uuid}", json=payload_ejemplo, headers=auth_header_user2)
    # Expect 403 because user has no role/permission
    # The logic: if not rol -> 403 "No perteneces a este proyecto" (if check fails early) OR actual perm check
    # In utils.py: 
    # rol = db.query(CuentaProyecto)...
    # if not rol: raise 403 (checked)
    # But wait, CuentaProyecto IS the link. `rol` variable in `verificar_permiso`? 
    # Let's check `require_project_permission`:
    # 1. Check CuentaProyecto
    # 2. Check Permiso
    # 3. Check RolPermiso (via cuenta_proyecto.rol_proyecto_id)
    # If no role assigned to CuentaProyecto, rol_proyecto_id is None?
    
    # If rol_proyecto_id is None, `tiene_permiso` query might act weird or just fail. 
    # db.query(RolPermiso).filter(RolPermiso.rol_id == None ...) -> Empty result.
    # So expected 403.
    assert response.status_code == 403

    # ==========================================
    # SCENARIO 2: User has Role WITHOUT permission
    # ==========================================
    # Assign Role No Perm
    assign_payload = {
        "cuenta_uuid": str(cp2.uuid),
        "proyecto_uuid": str(proj.uuid),
        "rol_proyecto_uuid": str(role_no_perm_uuid)
    }
    # Use main user to assign role
    response = client.post("/rol-proyectos/asignar-rol-cuenta", json=assign_payload, headers=auth_header)
    assert response.status_code == 200

    # Try access
    response = client.post(f"/ejemplos/?proyecto_uuid={proj.uuid}", json=payload_ejemplo, headers=auth_header_user2)
    assert response.status_code == 403
    assert "No tienes permiso" in response.json()["detail"]

    # ==========================================
    # SCENARIO 3: User has Role WITH permission
    # ==========================================
    # Assign Role With Perm
    assign_payload["rol_proyecto_uuid"] = str(role_with_perm_uuid)
    response = client.post("/rol-proyectos/asignar-rol-cuenta", json=assign_payload, headers=auth_header)
    assert response.status_code == 200

    # Try access
    response = client.post(f"/ejemplos/?proyecto_uuid={proj.uuid}", json=payload_ejemplo, headers=auth_header_user2)
    assert response.status_code == 201
    
    # ==========================================
    # SCENARIO 4: User NOT in project
    # ==========================================
    # Create User 3
    user3 = Cuenta(estadoCuenta=EstadoCuentaEnum.ACTIVO, rol_id=test_user.rol_id)
    db.add(user3)
    db.commit()
    db.refresh(user3)
    
    token3 = create_access_token(subject=str(user3.id))
    auth_header_user3 = {"Authorization": f"Bearer {token3}"}
    
    response = client.post(f"/ejemplos/?proyecto_uuid={proj.uuid}", json=payload_ejemplo, headers=auth_header_user3)
    assert response.status_code == 403
    assert "No perteneces a este proyecto" in response.json()["detail"]

    # ==========================================
    # SCENARIO 5: Project Not Found
    # ==========================================
    import uuid
    random_uuid = str(uuid.uuid4())
    response = client.post(f"/ejemplos/?proyecto_uuid={random_uuid}", json=payload_ejemplo, headers=auth_header_user2)
    assert response.status_code == 404
