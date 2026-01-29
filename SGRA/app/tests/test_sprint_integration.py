
import pytest
from datetime import date, timedelta
from app.models.proyecto import Proyecto, TipoProyecto, EstadoProyecto, EstadoActualProyecto
from app.models.cuenta_proyecto import CuentaProyecto
from app.models.historia_usuario import HistoriaUsuario, Estado as EstadoHU
from app.models.requisito import Requisito, TipoRequisitoEnum, PrioridadRequisitoEnum, EstadoRequisitoEnum, Riesgo_Requisito_Enum, Metodo_verificacion_requisito_Enum, Categoria_requisito_Enum
from app.models.sprint import EstadoSprint

def test_crud_sprint(client, auth_header, test_user, db):
    # Setup Project
    proj = Proyecto(
        codigo="SPR-001",
        nombre="Proyecto Sprint",
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

    cp = CuentaProyecto(cuenta_id=test_user.id, proyecto_id=proj.id)
    db.add(cp)
    db.commit()

    # 1. Create Sprint
    sprint_start = date.today()
    sprint_end = sprint_start + timedelta(days=14)
    payload = {
        "nombre": "Sprint 1",
        "fecha_inicio": sprint_start.isoformat(),
        "fecha_fin": sprint_end.isoformat(),
        "objetivo": "Objetivo del Sprint 1",
        "uuid_proyecto": str(proj.uuid)
    }
    response = client.post("/sprints/", json=payload, headers=auth_header)
    assert response.status_code == 201
    data = response.json()["data"]
    sprint_uuid = data["uuid"]
    assert data["nombre"] == "Sprint 1"
    assert data["estado"] == "PLANIFICADO"

    # 2. Get Sprints by Project
    response = client.get(f"/sprints/proyecto/{proj.uuid}", headers=auth_header)
    assert response.status_code == 200
    sprints_list = response.json()["data"]
    assert len(sprints_list) >= 1
    assert any(s["uuid"] == sprint_uuid for s in sprints_list)

    # 3. Update Sprint
    update_payload = {
        "nombre": "Sprint 1 Modificado",
        "objetivo": "Objetivo Modificado"
    }
    response = client.put(f"/sprints/{sprint_uuid}", json=update_payload, headers=auth_header)
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["nombre"] == "Sprint 1 Modificado"

    # 4. Change State
    state_payload = {"nuevo_estado": "EN_CURSO"}
    response = client.patch(f"/sprints/{sprint_uuid}/estado", json=state_payload, headers=auth_header)
    assert response.status_code == 200
    assert response.json()["data"]["estado"] == "EN_CURSO"

    # 5. Assign HU to Sprint
    # Need Requisito and HU
    req = Requisito(
        identificador="R-SPR",
        nombre="Req Sprint",
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
        titulo="HU para Sprint",
        identificador="HU-SPR",
        descripcion="Desc",
        prioridad="ALTA",
        estado=EstadoHU.PENDIENTE,
        estimacion=3,
        criterios_aceptacion="Criterios",
        creado_por_id=test_user.id
    )
    hu.requisitos.append(req)
    db.add(hu)
    db.commit()
    db.refresh(hu)

    assign_payload = {
        "sprint_uuid": str(sprint_uuid),
        "historia_uuid": str(hu.uuid),
        "uuid_creador": str(test_user.uuid) # Schema asks for uuid_creador
    }
    response = client.post("/sprints/asignar-historia", json=assign_payload, headers=auth_header)
    assert response.status_code == 200
    
    # 6. Remove HU
    remove_payload = {
        "sprint_uuid": str(sprint_uuid),
        "historia_uuid": str(hu.uuid),
        "uuid_creador": str(test_user.uuid)
    }
    response = client.post("/sprints/remover-historia", json=remove_payload, headers=auth_header)
    assert response.status_code == 200

    # 7. Delete Sprint
    response = client.delete(f"/sprints/{sprint_uuid}", headers=auth_header)
    assert response.status_code == 200
