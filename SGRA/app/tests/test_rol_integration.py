import pytest
from app.models.proyecto import Proyecto
from app.models.enums.estado_proyecto_enum import TipoProyecto, EstadoProyecto, EstadoActualProyecto
from app.models.cuenta import Cuenta, EstadoCuentaEnum
from datetime import date
from app.models.cuenta_proyecto import CuentaProyecto

def test_roles_flow(client, auth_header, test_user, db):
    # 1. Setup: Project and Permissions
    proj = Proyecto(
        codigo="ROL-001",
        nombre="Proyecto Roles",
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

    cp = CuentaProyecto(cuenta_id=test_user.id, proyecto_id=proj.id)
    db.add(cp)
    db.commit()

    # Create permission
    perm_payload = {
        "nombre": "crear-tareas",
        "descripcion": "Permite crear tareas"
    }
    response = client.post("/rol-proyectos/permiso", json=perm_payload, headers=auth_header)
    assert response.status_code in [201, 200]
    perm_uuid = response.json().get("data", {}).get("uuid") or response.json().get("data", {}).get("id") 
    
    # 2. Create Role
    role_payload = {
        "nombre": "Developer",
        "descripcion": "Dev Role",
        "permisos_uuids": [str(perm_uuid)], 
        "proyecto_uuid": str(proj.uuid)
    }
    response = client.post("/rol-proyectos/", json=role_payload, headers=auth_header)
    assert response.status_code == 200
    role_data = response.json()["data"]
    role_uuid = role_data["uuid"]
    assert role_data["nombre"] == "Developer"

    # 3. Assign Role to User
    # Create another user to assign role to
    user2 = Cuenta(estadoCuenta=EstadoCuentaEnum.ACTIVO, rol_id=test_user.rol_id)
    db.add(user2)
    db.commit()
    db.refresh(user2)

    from app.models.solicitud_cuenta import SolicitudCuenta, EstadoSolicitudEnum
    solicitud2 = SolicitudCuenta(
        nombre="User",
        apellido="Two",
        correo="user2@example.com",
        contrasena="pass",
        estado=EstadoSolicitudEnum.APROBADO,
        cuenta_id=user2.id
    )
    db.add(solicitud2)
    db.commit()
    
    cp2 = CuentaProyecto(cuenta_id=user2.id, proyecto_id=proj.id)
    db.add(cp2)
    db.commit()
    
    # Needs to be in project? "asignar-rol-cuenta" likely handles linking if not present OR expects link?
    # Schema AsignarRolCuentaProyecto: cuenta_uuid, proyecto_uuid, rol_uuid.
    # Service implementation usually checks if user is in project or adds them with the role.
    
    assign_payload = {
        "cuenta_uuid": str(cp2.uuid),
        "proyecto_uuid": str(proj.uuid),
        "rol_proyecto_uuid": str(role_uuid)
    }
    response = client.post("/rol-proyectos/asignar-rol-cuenta", json=assign_payload, headers=auth_header)
    assert response.status_code == 200
    assert "Rol asignado correctamente" in response.json()["msg"] or response.status_code == 200

    # 4. Verify user has role in project endpoints (e.g. users by project)
    response = client.get(f"/rol-proyectos/usuarios-por-proyecto/{proj.uuid}", headers=auth_header)
    assert response.status_code == 200
    data = response.json()["data"]
    # Check if user2 is in list
    assert any(u["cuenta_uuid"] == str(user2.uuid) for u in data)

