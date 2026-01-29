
import pytest
from uuid import uuid4
from datetime import date, datetime, timedelta
from app.models.enums.estado_proyecto_enum import EstadoProyecto, EstadoActualProyecto, TipoProyecto
from app.models.proyecto import Proyecto
from app.models.permiso import Permiso
from app.models.rol_proyecto import RolProyecto
from app.models.rol_permiso import RolPermiso
from app.models.cuenta_proyecto import CuentaProyecto
from app.models.requisito import Requisito, TipoRequisitoEnum, PrioridadRequisitoEnum, EstadoRequisitoEnum, Metodo_verificacion_requisito_Enum, Categoria_requisito_Enum, Riesgo_Requisito_Enum
from app.models.sprint import Sprint, EstadoSprint
from app.models.historia_usuario import HistoriaUsuario
from app.models.enums.prioridad_historia_usuario import Prioridad
from app.models.enums.estado_historia_usuario_enum import Estado as EstadoHU
from app.models.tarea import Tarea, EstadoTareaEnum, PrioridadTareaEnum
from app.models.defecto import Defecto, TipoDefectoEnum, PrioridadDefectoEnum, TipoSeveridadEnum, EstadoDefectoEnum
from app.core.security import create_access_token

# List of permissions to audit
PERMISSIONS_TO_TEST = {
    # --- Safe Operations & Updates ---
    # Proyecto
    "proyecto:editar": [("PUT", "/proyectos/{proyecto_uuid}", {"nombre": "Editado", "descripcion": "Desc"})],
    "proyecto:gestionar-usuarios": [("GET", "/proyectos/miembros/{proyecto_uuid}", None)],
    
    # Requisito
    "requisito:ver": [("GET", "/requisito/listar-requisitos/{proyecto_uuid}", None)],
    "requisito:crear": [("POST", "/requisito/guardar-requisito", {"proyecto_uuid": "{proyecto_uuid}", "nombre": "Req 1", "descripcion": "Desc", "tipo_requisito": "FUNCIONAL", "prioridad": "ALTA", "metodo_verificacion": "PRUEBA", "categoria": "ADECUACION_FUNCIONAL", "riesgo": "BAJO"})],
    "requisito:editar": [("POST", "/requisito/modificar-requisito", {"requisito_uuid": "{requisito_uuid}", "nombre": "Mod", "descripcion": "D", "tipo_requisito": "FUNCIONAL", "prioridad": "ALTA"})],
    
    # Sprint
    "sprint:ver": [("GET", "/sprints/proyecto/{proyecto_uuid}", None)],
    "sprint:crear": [("POST", "/sprints/", {"nombre": "Sprint 1", "fecha_inicio": str(date.today()), "fecha_fin": str(date.today() + timedelta(days=1)), "objetivo": "Obj sprint", "uuid_proyecto": "{proyecto_uuid}"})],
    "sprint:editar": [("PUT", "/sprints/{sprint_uuid}", {"nombre": "Sprint Mod"})], 

    # Historia
    "historia:ver": [("GET", "/historias_usuario/listar/{proyecto_uuid}", None)],
    "historia:crear": [("POST", "/historias_usuario/crear", {"titulo": "Historia T", "descripcion": "Esta es una descripcion lo suficientemente larga para cumplir con la validacion de minimo 60 caracteres requerida por el esquema de historia de usuario.", "prioridad": "ALTA", "criterios_aceptacion": "Crit", "estimacion": 5, "uuids_requisitos": ["{requisito_uuid}"]})],
    "hu:editar": [("PUT", "/historias_usuario/editar", {"uuid_historia": "{historia_uuid}", "datos": {"titulo": "Edited Title"}})],

    # Tarea
    "tarea:ver": [("GET", "/tarea/listar/{proyecto_uuid}", None)],
    "tarea:crear": [("POST", "/tarea/crear", {"titulo": "Tarea 1", "prioridad": "ALTA", "historia_usuario_uuid": "{historia_uuid}", "estimacion_horas": 1})],
    "tarea:editar": [("PUT", "/tarea/modificar/{tarea_uuid}", {"titulo": "Mod Tarea", "prioridad": "MEDIA", "responsable_cambio_uuid": "{cp_uuid}"})],
    
    # Defecto
    "defecto:ver": [("GET", "/defectos/listar/{proyecto_uuid}", None)],
    "defecto:crear": [("POST", "/defectos/", {"titulo": "Bug 1", "tipo_defecto": "FUNCIONAL", "prioridad": "ALTA", "severidad": "CRITICO", "historia_usuario_uuid": "{historia_uuid}"})],
    "defecto:editar": [("PUT", "/defectos/{defecto_uuid}", {"titulo": "Bug Mod"})],

    # --- DELETE Operations (Child -> Parent) ---
    "defecto:eliminar": [("DELETE", "/defectos/{defecto_uuid}", None)],
    "tarea:eliminar": [("DELETE", "/tarea/eliminar/{tarea_uuid}", None)],
    "hu:eliminar": [("DELETE", "/historias_usuario/eliminar", {"uuid_historia": "{historia_uuid}"}, True)], 
    "sprint:eliminar": [("DELETE", "/sprints/{sprint_uuid}", None)],
    # Requisito has no explicit delete endpoint listed in permissions? 
    # Wait, check if requisito:eliminar is a permission.
    # Looking at my first write of test_permisos_audit.py (Step 226), I didn't include requisito:eliminar?
    # I checked `requisito_controller.py` in step... 178? No, 178 was sprint.
    # Requisito controller (Step 168) only has `guardar`, `modificar`, `cambiar_estado`, `listar`. No delete?
    # Task list said "Requisito: ... eliminar (No endpoint?)".
    # I will stick to what creates coverage.
    
    "proyecto:eliminar": [("DELETE", "/proyectos/{proyecto_uuid}", None)],
}

def test_audit_permissions_enforcement(client, db, test_user):
    # 1. Setup Permissions
    perms = {}
    for code in PERMISSIONS_TO_TEST.keys():
        p = db.query(Permiso).filter_by(nombre=code).first()
        if not p:
            p = Permiso(nombre=code, descripcion=f"Test {code}")
            (db.add(p))
        perms[code] = p
    db.commit()

    # 2. Setup Project
    proj = Proyecto(
        nombre="Audit Project", 
        descripcion="Testing permissions", 
        codigo="AUDIT-1",
        estado=EstadoProyecto.ACTIVO,
        estado_actual=EstadoActualProyecto.PLANIFICACION,
        tipo=TipoProyecto.WEB
    )
    db.add(proj)
    db.commit()
    db.refresh(proj)

    # 3. Setup Roles
    role_admin = RolProyecto(nombre="Rol Admin", descripcion="Has all permissions", proyecto_id=proj.id)
    role_none = RolProyecto(nombre="Rol None", descripcion="Has no permissions", proyecto_id=proj.id)
    db.add_all([role_admin, role_none])
    db.commit()

    # Assign all permissions to Admin Role
    for p in perms.values():
        db.add(RolPermiso(rol_id=role_admin.id, permiso_id=p.id))
    db.commit()



    # 4. Assign User to Project (initially with Admin role to create entities)
    cp = CuentaProyecto(cuenta_id=test_user.id, proyecto_id=proj.id, rol_proyecto_id=role_admin.id)
    db.add(cp)
    db.commit()

    test_token = create_access_token(subject=str(test_user.id))
    headers = {"Authorization": f"Bearer {test_token}"}

    # 5. Create specific entities for replacement in URLs/Payloads
    # Requisito
    req = Requisito(
        uuid=str(uuid4()), proyecto_id=proj.id, identificador="REQ-1", nombre="R1", descripcion="D1",
        tipo=TipoRequisitoEnum.FUNCIONAL, prioridad=PrioridadRequisitoEnum.ALTA, estado=EstadoRequisitoEnum.PENDIENTE,
        metodo_verificacion=Metodo_verificacion_requisito_Enum.PRUEBA, categoria=Categoria_requisito_Enum.ADECUACION_FUNCIONAL,
        riesgo=Riesgo_Requisito_Enum.BAJO
    )
    db.add(req)
    db.flush()
    db.refresh(req)
    
    # Sprint
    sprint = Sprint(
        uuid=str(uuid4()), proyecto_id=proj.id, nombre="S1", fecha_inicio=date.today(), fecha_fin=date.today(),
        objetivo="Obj", estado=EstadoSprint.PLANIFICADO
    )
    db.add(sprint)
    db.flush()
    db.refresh(sprint)

    # Historia
    hu = HistoriaUsuario(
        uuid=str(uuid4()), titulo="HU1", descripcion="Esta es una descripcion lo suficientemente larga para cumplir con la validacion de minimo 60 caracteres requerida por el esquema de historia de usuario.", prioridad=Prioridad.ALTA,
        estado=EstadoHU.PENDIENTE, estimacion=5, criterios_aceptacion="Crit", 
        requisitos=[req], creado_por_id=cp.id, sprint_id=sprint.id
    )
    db.add(hu)
    db.flush()
    db.refresh(hu)

    # Tarea
    tarea = Tarea(
        uuid=str(uuid4()), identificador="TAR-1", titulo="T1", prioridad=PrioridadTareaEnum.ALTA, estado=EstadoTareaEnum.PENDIENTE,
        historia_usuario_id=hu.id
    )
    db.add(tarea)
    db.flush()
    db.refresh(tarea)

    # Defecto
    bug = Defecto(
        uuid=str(uuid4()), titulo="Bug1", descripcion_detallada="Desc", tipo_defecto=TipoDefectoEnum.FUNCIONAL,
        prioridad=PrioridadDefectoEnum.ALTA, severidad=TipoSeveridadEnum.CRITICO, estado=EstadoDefectoEnum.PENDIENTE,
        historia_usuario_id=hu.id, codigo="DEF-1"
    )
    db.add(bug)
    
    db.commit()
    
    # Helper to switch roles
    def switch_role(role_obj):
        cp.rol_proyecto_id = role_obj.id
        db.commit()

    # 6. Iterate and Test
    print("\n--- Starting Permission Audit ---")
    
    replacements = {
        "{proyecto_uuid}": str(proj.uuid),
        "{requisito_uuid}": str(req.uuid),
        "{historia_uuid}": str(hu.uuid),
        "{tarea_uuid}": str(tarea.uuid),
        "{sprint_uuid}": str(sprint.uuid),
        "{defecto_uuid}": str(bug.uuid),
        "{cp_uuid}": str(cp.uuid)
    }

    def format_val(val):
        if isinstance(val, str):
            for k, v in replacements.items():
                val = val.replace(k, v)
        if isinstance(val, dict):
            return {k: format_val(v) for k, v in val.items()}
        if isinstance(val, list):
            return [format_val(v) for v in val]
        return val

    for permission, tests in PERMISSIONS_TO_TEST.items():
        print(f"Testing Permission: {permission}")
        for test_case in tests:
            method, url, payload = test_case[:3]
            has_body_delete = False
            if len(test_case) == 4:
                 has_body_delete = test_case[3]

            url_fmt = format_val(url)
            payload_fmt = format_val(payload) if payload else None
            
            # TEST 1: Positive Case (Has Permission)
            switch_role(role_admin)
            
            # Since we are modifying real data, creating might duplicate or deleting might remove.
            # Ideally we rely on the specific endpoints logic.
            # DELETE endpoints will remove the entity, making subsequent tests fail.
            # We should skip actual execution success check, just check for 403 vs 200/201/404/400 (anything but 403)
            # Actually, if we delete the entity, the next test (Negative) will get 404, which is NOT 403.
            # So Delete tests are tricky.
            # Strategy: For DELETE, run Negative case FIRST (should get 403), then Positive case.
            
            # TEST 2: Negative Case (No Permission)
            switch_role(role_none)
            resp = client.request(method, url_fmt, json=payload_fmt, headers=headers)
            if has_body_delete and method == "DELETE":
                 resp = client.request(method, url_fmt, json=payload_fmt, headers=headers)
                 
            if resp.status_code != 403:
                print(f"[DEBUG] Status: {resp.status_code}, Response: {resp.text}")
            
            assert resp.status_code == 403, f"Endpoint {method} {url_fmt} require {permission}, but got {resp.status_code} with no permissions"

            # TEST 3: Positive Check
            # We only run positive check if it's not destructive or if we can handle it.
            # For Audit purposes, verifying 403 is the most critical part for Security.
            # Verifying 200/201 confirms the logic works when authorized.
            switch_role(role_admin)
            resp = client.request(method, url_fmt, json=payload_fmt, headers=headers)
            # Expect success (2xx) or Client Error (4xx but not 403 - e.g. 404 if deleted already, or 400 validation)
            assert resp.status_code != 403, f"Endpoint {method} {url_fmt} should allow access with permission {permission}, but got 403"
            
    print("--- Audit Completed Successfully ---")
