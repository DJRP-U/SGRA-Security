
import pytest
from datetime import date, timedelta, datetime
from app.models.proyecto import Proyecto, TipoProyecto, EstadoProyecto, EstadoActualProyecto
from app.models.cuenta_proyecto import CuentaProyecto
from app.models.historia_usuario import HistoriaUsuario, Estado as EstadoHU
from app.models.requisito import Requisito, TipoRequisitoEnum, PrioridadRequisitoEnum, EstadoRequisitoEnum, Riesgo_Requisito_Enum, Metodo_verificacion_requisito_Enum, Categoria_requisito_Enum
from app.models.tarea import EstadoTareaEnum, PrioridadTareaEnum

def test_crud_tarea(client, auth_header, test_user, db):
    # Setup Project, Requisito, HU
    proj = Proyecto(
        codigo="TAR-001",
        nombre="Proyecto Tarea",
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
    db.refresh(cp) 

    req = Requisito(
        identificador="R-TAR",
        nombre="Req Tarea",
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
        titulo="HU para Tarea",
        identificador="HU-TAR",
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

    # 1. Create Tarea
    payload = {
        "titulo": "Tarea 1",
        "descripcion": "Descripción de tarea",
        "criterios_entrada": "Entrada",
        "criterios_salida": "Salida",
        "fecha_limite": (datetime.now() + timedelta(days=5)).isoformat(),
        "tipo_tarea": "Desarrollo",
        "estimacion_horas": 4,
        "prioridad": "ALTA",
        "historia_usuario_uuid": str(hu.uuid),
        "cuenta_proyecto_uuid": str(cp.uuid) # Assign to self
    }
    response = client.post("/tarea/crear", json=payload, headers=auth_header)
    assert response.status_code == 200
    data = response.json()["data"]
    tarea_uuid = data["uuid"]
    assert data["titulo"] == "Tarea 1"
    assert data["estado"] == "ASIGNADA" # Should be ASIGNADA if cuenta_proyecto_uuid provided, else PENDIENTE

    # 2. List Tareas
    # Controller now calls listar_tareas_por_proyecto using the passed UUID.
    # So we must pass the PROJECT UUID, not HU UUID, even if the URL says otherwise or variable name is confusing.
    response = client.get(f"/tarea/listar/{proj.uuid}", headers=auth_header)
    assert response.status_code == 200
    tareas_list = response.json()["data"]["tareas"]
    assert len(tareas_list) >= 1
    assert any(t["uuid"] == tarea_uuid for t in tareas_list)

    # 3. Modify Tarea
    mod_payload = {
        "titulo": "Tarea 1 Modificada",
        "prioridad": "MEDIA",
        "responsable_cambio_uuid": str(cp.uuid), # Fix: Must be CuentaProyecto UUID
        "cuenta_proyecto_uuid": str(cp.uuid) 
        # Note: other fields optional
    }
    response = client.put(f"/tarea/modificar/{tarea_uuid}", json=mod_payload, headers=auth_header)
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["titulo"] == "Tarea 1 Modificada"
    assert data["prioridad"] == "MEDIA"

    # 4. Start Progress
    start_payload = {"responsable_cambio_uuid": str(cp.uuid)}
    response = client.patch(f"/tarea/iniciar-progreso/{tarea_uuid}", json=start_payload, headers=auth_header)
    assert response.status_code == 200
    assert response.json()["data"]["estado"] == "EN_PROGRESO"

    # 5. Send to Revision
    rev_payload = {"responsable_cambio_uuid": str(cp.uuid)}
    response = client.patch(f"/tarea/enviar-revision/{tarea_uuid}", json=rev_payload, headers=auth_header)
    assert response.status_code == 200
    assert response.json()["data"]["estado"] == "PENDIENTE_POR_REVISAR"

    # 6. Review (Approve)
    approve_payload = {
        "aprobado": True,
        "comentario": "Buen trabajo",
        "responsable_cambio_uuid": str(cp.uuid)
    }
    response = client.patch(f"/tarea/revisar/{tarea_uuid}", json=approve_payload, headers=auth_header)
    assert response.status_code == 200
    assert response.json()["data"]["estado"] == "COMPLETADA"

    # 7. Delete Tarea (Must be PENDIENTE)
    # Create a new task for deletion
    delete_payload = {
        "titulo": "Tarea a eliminar",
        "prioridad": "BAJA",
        "historia_usuario_uuid": str(hu.uuid),
        # No assignee -> PENDIENTE
    }
    response = client.post("/tarea/crear", json=delete_payload, headers=auth_header)
    assert response.status_code == 200
    del_uuid = response.json()["data"]["uuid"]

    response = client.delete(f"/tarea/eliminar/{del_uuid}", headers=auth_header)
    assert response.status_code == 200
