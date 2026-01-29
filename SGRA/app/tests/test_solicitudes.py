import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from uuid import uuid4

from app.main import app
from app.core.get_db import get_db
from app.models.base_model_orm import BaseModelORM
from app.models.solicitud_cuenta import SolicitudCuenta

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

BaseModelORM.metadata.create_all(bind=engine)

client = TestClient(app)


@pytest.fixture(autouse=True)
def limpiar_bd():
    db = TestingSessionLocal()
    db.query(SolicitudCuenta).delete()
    db.commit()
    db.close()


def test_01_crear_solicitud_correcta():
    payload = {
        "nombre": "Carlos",
        "apellido": "Ramírez",
        "nombre": "Carlos",
        "apellido": "Ramírez",
        "correo": f"carlos.{str(uuid4())}@test.com",
        "contrasena": "Contra12345678"
    }

    response = client.post("/solicitud/crear-solicitud", json=payload)

    assert response.status_code == 201
    json_data = response.json()
    assert json_data["msg"] == "Solicitud creada exitosamente"
    assert json_data["code"] == 201


def test_02_crear_solicitud_correo_duplicado():
    payload = {
        "nombre": "Carlos",
        "apellido": "Ramírez",
        "correo": "carlos.ramirez@test.com",
        "contrasena": "Contra12345678"
    }

    # Crear solicitud inicial
    client.post("/solicitud/crear-solicitud", json=payload)

    # Intento duplicado
    response = client.post("/solicitud/crear-solicitud", json=payload)

    assert response.status_code == 400
    assert "El correo ya está en uso" in response.json()["detail"]


def test_03_contrasena_muy_corta():
    payload = {
        "nombre": "Ana",
        "apellido": "López",
        "correo": "ana@test.com",
        "contrasena": "Ab12"
    }

    response = client.post("/solicitud/crear-solicitud", json=payload)

    assert response.status_code == 400
    assert "al menos 8 caracteres" in response.json()["detail"]


def test_04_contrasena_sin_mayuscula():
    payload = {
        "nombre": "Luis",
        "apellido": "García",
        "correo": "luis@test.com",
        "contrasena": "contra123"
    }

    response = client.post("/solicitud/crear-solicitud", json=payload)

    assert response.status_code == 400
    assert "al menos una letra mayúscula" in response.json()["detail"]


def test_05_contrasena_sin_minuscula():
    payload = {
        "nombre": "María",
        "apellido": "Vega",
        "correo": "maria@test.com",
        "contrasena": "CONTRA123"
    }

    response = client.post("/solicitud/crear-solicitud", json=payload)

    assert response.status_code == 400
    assert "al menos una letra minúscula" in response.json()["detail"]


def test_06_contrasena_sin_numero():
    payload = {
        "nombre": "Pedro",
        "apellido": "Martínez",
        "correo": "pedro@test.com",
        "contrasena": "ContraABC"
    }

    response = client.post("/solicitud/crear-solicitud", json=payload)

    assert response.status_code == 400
    assert "al menos un número" in response.json()["detail"]


def test_07_listar_solicitudes():
    # Crear una solicitud válida primero
    payload = {
        "nombre": "Sofía",
        "apellido": "Mendoza",
        "correo": "sofia.test@test.com",
        "contrasena": "Contra12345"
    }
    client.post("/solicitud/crear-solicitud", json=payload)

    # Luego listar solicitudes
    response = client.get("/solicitud")
    assert response.status_code == 200

    data = response.json()
    # Fix: The response structure is { data: { solicitudes: [...] } }
    assert "data" in data
    assert "solicitudes" in data["data"]
    assert data["data"]["total"] >= 1
    assert isinstance(data["data"]["solicitudes"], list)


def test_08_listar_solicitudes_paginadas():
    # Crear solicitud para asegurar que haya datos
    payload = {
        "nombre": "Mario",
        "apellido": "Castro",
        "correo": "mario.cast@test.com",
        "contrasena": "Contra12345"
    }
    client.post("/solicitud/crear-solicitud", json=payload)
    
    params = {"page": 1, "page_size": 1}
    response = client.get("/solicitud", params=params)
    assert response.status_code == 200

    data = response.json()
    assert len(data["data"]["solicitudes"]) <= 1
