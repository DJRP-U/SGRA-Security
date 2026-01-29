import pytest
from app.models.solicitud_cuenta import SolicitudCuenta, EstadoSolicitudEnum

def test_login_success(client, test_user):
    payload = {
        "correo": "test@example.com",
        "contrasena": "Test1234"
    }
    response = client.post("/cuenta/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["data"]["access_token"] is not None
    assert data["data"]["rol"] == "ADMINISTRADOR"

def test_login_failure(client, test_user):
    payload = {
        "correo": "test@example.com",
        "contrasena": "WrongPassword"
    }
    response = client.post("/cuenta/login", json=payload)
    assert response.status_code == 401
    assert "Credenciales inválidas" in response.json()["detail"]

def test_get_me_protected(client, auth_header):
    response = client.get("/cuenta/me", headers=auth_header)
    assert response.status_code == 200
    data = response.json()
    assert data["estado"] == "ACTIVO"

def test_list_usuarios_admin_required(client, test_user, auth_header, db):
    # test_user is ADMINISTRADOR by default in conftest
    response = client.get("/cuenta/usuarios", headers=auth_header)
    assert response.status_code == 200
    data = response.json()
    assert len(data["data"]) >= 1

def test_registration_flow(client, db):
    # 1. Register
    payload = {
        "nombre": "New",
        "apellido": "User",
        "correo": "new@example.com",
        "contrasena": "SecurePass1"
    }
    response = client.post("/solicitud/crear-solicitud", json=payload)
    assert response.status_code == 201
    
    # 2. Verify it's pending
    solicitud = db.query(SolicitudCuenta).filter_by(correo="new@example.com").first()
    assert solicitud is not None
    assert solicitud.estado == EstadoSolicitudEnum.PENDIENTE

    # 3. Try to login (should fail)
    login_payload = {
        "correo": "new@example.com",
        "contrasena": "SecurePass1"
    }
    response = client.post("/cuenta/login", json=login_payload)
    assert response.status_code == 401 # Or specific error for "no account"
