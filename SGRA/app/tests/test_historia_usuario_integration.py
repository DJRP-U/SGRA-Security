import pytest
from datetime import date
from app.models.proyecto import Proyecto
from app.models.enums.estado_proyecto_enum import TipoProyecto, EstadoProyecto, EstadoActualProyecto
from app.models.cuenta_proyecto import CuentaProyecto
from app.models.requisito import Requisito, TipoRequisitoEnum, PrioridadRequisitoEnum, EstadoRequisitoEnum, Metodo_verificacion_requisito_Enum, Categoria_requisito_Enum, Riesgo_Requisito_Enum

from app.models.rol_proyecto import RolProyecto
from app.models.permiso import Permiso
from app.models.rol_permiso import RolPermiso

def test_crud_historia_usuario(client, auth_header, test_user, db):
    # Setup Project and Requisito
    proj = Proyecto(
        codigo="HU-001",
        nombre="Proyecto HU",
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
    
    # Setup RBAC: Permission and Role
    perm = Permiso(nombre="hu:eliminar", descripcion="Eliminar HU")
    perm_edit = Permiso(nombre="hu:editar", descripcion="Editar HU")
    db.add(perm)
    db.add(perm_edit)
    db.commit()
    
    role = RolProyecto(nombre="PO", descripcion="Owner", proyecto_id=proj.id)
    db.add(role)
    db.commit()
    
    rp = RolPermiso(rol_id=role.id, permiso_id=perm.id)
    rp2 = RolPermiso(rol_id=role.id, permiso_id=perm_edit.id)
    db.add(rp)
    db.add(rp2)
    db.commit()

    cp = CuentaProyecto(cuenta_id=test_user.id, proyecto_id=proj.id, rol_proyecto_id=role.id)
    db.add(cp)
    db.commit()

    req = Requisito(
        identificador="R-001",
        nombre="Req For HU",
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
    db.refresh(req)

    # 1. Create HU
    payload = {
        "titulo": "Historia de Usuario 1",
        "descripcion": "Como usuario quiero... para... (long enough description to meet min_length=60 characters constraint requirement for validation testing purposes) ..........",
        "prioridad": "ALTA",
        "criterios_aceptacion": "Criterio 1",
        "estimacion": 5,
        "uuids_requisitos": [str(req.uuid)],
        "uuid_responsable": str(test_user.uuid)  # Creator logic
    }
    # Endpoint might differ. Usually /historias-usuario/crear or similar.
    # need to check controller. Assuming /historias-usuario/
    # If controller has `crear_historia_usuario`
    
    response = client.post("/historias_usuario/crear", json=payload, headers=auth_header)
    assert response.status_code == 201
    data = response.json()["data"]
    # If uuid is missing in response, fetch it from list
    if "uuid" in data:
        hu_uuid = data["uuid"]
    else:
        # Fetch from list to get UUID
        response_list = client.get(f"/historias_usuario/listar/{proj.uuid}", headers=auth_header)
        data_list = response_list.json()["data"]["historias"]
        hu_uuid = data_list[0]["uuid"]

    assert data["titulo"] == "Historia de Usuario 1"
    
    # 2. List HUs by Project
    response = client.get(f"/historias_usuario/listar/{proj.uuid}", headers=auth_header)
    assert response.status_code == 200
    data_list = response.json()["data"]["historias"] 
    assert len(data_list) >= 1
    assert any(h["uuid"] == hu_uuid for h in data_list)

    # 3. Edit HU
    edit_payload = {
        "uuid_historia": str(hu_uuid),
        "datos": {
            "titulo": "Historia Editada",
            "descripcion": "Descripcion editada y suficientemente largas para pasar validaciones de longitud minima requerida por el modelo ... ... ... ...."
        }
    }
    response = client.put("/historias_usuario/editar", json=edit_payload, headers=auth_header)
    assert response.status_code == 200
    data = response.json()["data"]
    assert data["titulo"] == "Historia Editada"

    # 4. Delete HU
    del_payload = {"uuid_historia": str(hu_uuid)}
    # DELETE with body
    response = client.request("DELETE", "/historias_usuario/eliminar", json=del_payload, headers=auth_header)
    assert response.status_code == 200
    
    # Verify deletion
    response = client.get(f"/historias_usuario/listar/{proj.uuid}", headers=auth_header)
    data_list = response.json()["data"]["historias"]
    assert not any(h["uuid"] == hu_uuid for h in data_list)
