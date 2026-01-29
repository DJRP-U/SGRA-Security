import pytest
import uuid
from datetime import date
from app.models.proyecto import Proyecto
from app.models.enums.estado_proyecto_enum import TipoProyecto, EstadoProyecto, EstadoActualProyecto
from app.models.cuenta import Cuenta, EstadoCuentaEnum
from app.models.cuenta_proyecto import CuentaProyecto

def test_crear_proyecto(client, auth_header, test_user):
    payload = {
        "codigo": "PROJ-001",
        "nombre": "Proyecto Test",
        "descripcion": "Descripcion de prueba",
        "fecha_inicio": str(date.today()),
        "fecha_fin": str(date.today()),
        "tipo": "WEB",
        "uuid_usuario": str(test_user.uuid)
    }
    response = client.post("/proyectos/", json=payload, headers=auth_header)
    assert response.status_code == 201
    data = response.json()
    assert data["data"]["codigo"] == "PROJ-001"
    assert data["data"]["uuid"] is not None

def test_listar_proyectos(client, auth_header, db, test_user):
    # Ensure a project exists
    proj = Proyecto(
        codigo="LIST-001",
        nombre="Proyecto Listar",
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

    # Link user to project
    cp = CuentaProyecto(cuenta_id=test_user.id, proyecto_id=proj.id)
    db.add(cp)
    db.commit()

    response = client.get("/proyectos/", headers=auth_header)
    assert response.status_code == 200
    data = response.json()
    assert len(data["data"]) >= 1

def test_obtener_proyecto_detalle(client, auth_header, db, test_user):
    proj = Proyecto(
        codigo="DET-001",
        nombre="Proyecto Detalle",
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

    response = client.get(f"/proyectos/{proj.uuid}", headers=auth_header)
    assert response.status_code == 200
    data = response.json()
    assert data["data"]["codigo"] == "DET-001"

def test_agregar_miembro(client, auth_header, db, test_user):
    # 1. Create Project
    proj = Proyecto(
        codigo="MEM-001",
        nombre="Proyecto Miembros",
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

    # 2. Create another user
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

    # 3. Add user2 to project
    params = {
        "uuid_proyecto": str(proj.uuid),
        "uuid_usuario": str(user2.uuid)
    }
    response = client.post("/proyectos/agregar-usuario", params=params, headers=auth_header)
    assert response.status_code == 201
    assert "Usuario agregado al proyecto" in response.json()["msg"] or "Usuario agregado correctamente al proyecto" in response.json()["msg"]

    # 4. Verify members list
    response = client.get(f"/proyectos/miembros/{proj.uuid}", params={"uuid_proyecto": str(proj.uuid)}, headers=auth_header)
    assert response.status_code == 200
    members = response.json()["data"]
    assert len(members) >= 1
