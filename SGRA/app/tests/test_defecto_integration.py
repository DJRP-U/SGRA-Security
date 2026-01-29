
import pytest
from datetime import date, timedelta, datetime
from app.models.proyecto import Proyecto, TipoProyecto, EstadoProyecto, EstadoActualProyecto
from app.models.cuenta_proyecto import CuentaProyecto
from app.models.historia_usuario import HistoriaUsuario, Estado as EstadoHU
from app.models.requisito import Requisito, TipoRequisitoEnum, PrioridadRequisitoEnum, EstadoRequisitoEnum, Riesgo_Requisito_Enum, Metodo_verificacion_requisito_Enum, Categoria_requisito_Enum
from app.models.defecto import TipoSeveridadEnum, EstadoDefectoEnum

from app.models.rol_proyecto import RolProyecto
from app.models.permiso import Permiso
from app.models.rol_permiso import RolPermiso

def test_crud_defecto(client, auth_header, test_user, db):
    # Setup Project, Member, Requisito, HU
    proj = Proyecto(
        codigo="DEF-001",
        nombre="Proyecto Defecto",
        descripcion="Desc",
        fecha_inicio=date.today(),
        fecha_fin=date.today() + timedelta(days=30),
        tipo=TipoProyecto.WEB,
        estado=EstadoProyecto.ACTIVO,
        estado_actual=EstadoActualProyecto.PLANIFICACION
    )
    db.add(proj)
    db.commit()
    db.refresh(proj)

    # Setup Permissions and Role
    perm_crear = Permiso(nombre="defecto:crear", descripcion="Crear defecto")
    perm_asignar = Permiso(nombre="defecto:asignar_responsable", descripcion="Asignar")
    perm_eliminar = Permiso(nombre="defecto:eliminar", descripcion="Eliminar")
    db.add_all([perm_crear, perm_asignar, perm_eliminar])
    db.commit()

    rol = RolProyecto(nombre="QA Tester", descripcion="Rol de pruebas", proyecto_id=proj.id)
    db.add(rol)
    db.commit()

    db.add(RolPermiso(rol_id=rol.id, permiso_id=perm_crear.id))
    db.add(RolPermiso(rol_id=rol.id, permiso_id=perm_asignar.id))
    db.add(RolPermiso(rol_id=rol.id, permiso_id=perm_eliminar.id))
    db.commit()

    cp = CuentaProyecto(cuenta_id=test_user.id, proyecto_id=proj.id, rol_proyecto_id=rol.id)
    db.add(cp)
    db.commit()
    db.refresh(cp)

    req = Requisito(
        identificador="R-DEF",
        nombre="Req Defecto",
        descripcion="Desc",
        tipo=TipoRequisitoEnum.FUNCIONAL,
        prioridad=PrioridadRequisitoEnum.ALTA,
        estado=EstadoRequisitoEnum.APROBADO,
        riesgo=Riesgo_Requisito_Enum.BAJO,
        metodo_verificacion=Metodo_verificacion_requisito_Enum.PRUEBA,
        categoria=Categoria_requisito_Enum.SEGURIDAD,
        proyecto_id=proj.id
    )
    db.add(req)
    db.commit()

    hu = HistoriaUsuario(
        titulo="HU para Defecto",
        identificador="HU-DEF",
        descripcion="Desc",
        prioridad="ALTA",
        estado=EstadoHU.PENDIENTE,
        estimacion=5,
        criterios_aceptacion="Criterios",
        creado_por_id=test_user.id
    )
    hu.requisitos.append(req)
    db.add(hu)
    db.commit()
    db.refresh(hu)

    # 1. Create Defecto
    payload = {
        "titulo": "Defecto 1",
        "descripcion_detallada": "Descripción del defecto detallada",
        "severidad": "ALTO",
        "prioridad": "ALTA",
        "tipo_defecto": "FUNCIONAL",
        "historia_usuario_uuid": str(hu.uuid),
        "fecha_limite": (datetime.now() + timedelta(days=5)).isoformat()
    }
    response = client.post("/defectos/", json=payload, headers=auth_header)
    assert response.status_code == 201
    data = response.json()["data"]
    defecto_uuid = data["uuid"]
    assert data["titulo"] == "Defecto 1"
    assert data["estado"] == "PENDIENTE"
    assert data["codigo"] is not None

    # 2. List Defects by Project
    response = client.get(f"/defectos/listar/{proj.uuid}", headers=auth_header)
    assert response.status_code == 200
    list_data = response.json()["data"]["items"]
    assert len(list_data) >= 1
    assert any(d["uuid"] == defecto_uuid for d in list_data)

    # 3. List Defects by HU
    response = client.get(f"/defectos/historia-usuario/{hu.uuid}", headers=auth_header)
    assert response.status_code == 200
    list_hu_data = response.json()["data"]
    assert len(list_hu_data) >= 1

    # 4. Get Defecto Detail
    response = client.get(f"/defectos/{defecto_uuid}", headers=auth_header)
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["uuid"] == defecto_uuid

    # 5. Assign Encargado
    assign_payload = {
        "cuenta_proyecto_uuid": str(cp.uuid)
    }
    response = client.patch(f"/defectos/{defecto_uuid}/asignar", json=assign_payload, headers=auth_header)
    assert response.status_code == 200
    # assert response.json()["data"]["cuenta_proyecto_uuid"] == str(cp.uuid)
    # Status should auto-update to ASIGNADO? Let's check logic or assert current status
    # Usually assigning changes status to ASIGNADO if it was PENDIENTE.
    # Asserting updated status
    assert response.json()["data"]["estado"] == "ASIGNADO"

    # 6. Update Defecto
    update_payload = {
        "titulo": "Defecto 1 Updated",
        "severidad": "CRITICO",
        "prioridad": "MEDIA"
    }
    response = client.put(f"/defectos/{defecto_uuid}", json=update_payload, headers=auth_header)
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["titulo"] == "Defecto 1 Updated"
    assert data["severidad"] == "CRITICO"

    # 7. Change State
    state_payload = {
        "estado": "EN_DESARROLLO",
        "comentario": "Iniciando corrección"
    }
    response = client.patch(f"/defectos/{defecto_uuid}/estado", json=state_payload, headers=auth_header)
    assert response.status_code == 200
    assert response.json()["data"]["estado"] == "EN_DESARROLLO"

    # 8. Delete Defecto (Create new one to delete)
    payload_del = {
        "titulo": "Defecto para borrar",
        "descripcion_detallada": "Descripción",
        "severidad": "BAJO",
        "prioridad": "BAJA",
        "tipo_defecto": "UI",
        "historia_usuario_uuid": str(hu.uuid),
        "fecha_limite": (datetime.now() + timedelta(days=5)).isoformat()
    }
    response = client.post("/defectos/", json=payload_del, headers=auth_header)
    assert response.status_code == 201
    del_uuid = response.json()["data"]["uuid"]

    response = client.delete(f"/defectos/{del_uuid}", headers=auth_header)
    assert response.status_code == 200
    
    # Verify Deletion
    response = client.get(f"/defectos/{del_uuid}", headers=auth_header)
    assert response.status_code == 404
