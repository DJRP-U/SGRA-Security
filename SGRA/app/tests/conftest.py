import pytest
import os
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.core.get_db import get_db
from app.models.base_model_orm import BaseModelORM
from app.models.cuenta import Cuenta, EstadoCuentaEnum
from app.models.rol import Rol
from app.core.security import create_access_token

# Use an in-memory SQLite database for tests
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db():
    # Create the database tables
    BaseModelORM.metadata.create_all(bind=engine)
    
    # Create a new session for the test
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)

    yield session

    # Teardown
    session.close()
    transaction.rollback()
    connection.close()

@pytest.fixture(scope="function")
def client(db):
    def override_get_db():
        try:
            yield db
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    
    # Custom Logging Wrapper
    class LoggingTestClient(TestClient):
        def request(self, method, url, *args, **kwargs):
            print(f"\n[TEST] {method} {url}")
            if 'json' in kwargs:
                 print(f"[TEST] Payload: {kwargs['json']}")
            return super().request(method, url, *args, **kwargs)

    yield LoggingTestClient(app)
    app.dependency_overrides.clear()

from app.models.solicitud_cuenta import SolicitudCuenta, EstadoSolicitudEnum
from app.utils.utils import hash_password

@pytest.fixture(scope="function")
def test_user(db):
    # Ensure rol ADMIN exists
    rol = db.query(Rol).filter_by(nombre="ADMINISTRADOR").first()
    if not rol:
        rol = Rol(nombre="ADMINISTRADOR")
        db.add(rol)
        db.commit()
        db.refresh(rol)

    # Create account
    user = Cuenta(
        estadoCuenta=EstadoCuentaEnum.ACTIVO,
        rol_id=rol.id
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Create associated request with credentials
    password_hashes = hash_password("Test1234")
    solicitud = SolicitudCuenta(
        nombre="Test",
        apellido="User",
        correo="test@example.com",
        contrasena=password_hashes,
        estado=EstadoSolicitudEnum.APROBADO,
        cuenta_id=user.id
    )
    db.add(solicitud)
    db.commit()
    
    # Reload user to ensure relationships
    db.refresh(user)
    return user

@pytest.fixture(scope="function")
def auth_header(test_user):
    access_token = create_access_token(subject=str(test_user.id))
    return {"Authorization": f"Bearer {access_token}"}
