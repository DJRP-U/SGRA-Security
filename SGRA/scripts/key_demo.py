import base64
import bcrypt
from cryptography.fernet import Fernet


def hash_password(password: str) -> str:
    """Genera un hash bcrypt y lo codifica en base64 (útil para almacenamiento)."""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return base64.b64encode(hashed).decode("utf-8")


def verify_password(password: str, hashed_b64: str) -> bool:
    """Verifica una contraseña contra el hash en base64."""
    hashed = base64.b64decode(hashed_b64.encode("utf-8"))
    return bcrypt.checkpw(password.encode("utf-8"), hashed)


def generate_fernet_key() -> str:
    """Genera una clave Fernet (url-safe base64)."""
    return Fernet.generate_key().decode("utf-8")


def encrypt_with_key(key: str, plaintext: str) -> str:
    """Encripta texto con la clave Fernet y devuelve el token (base64 url-safe)."""
    f = Fernet(key.encode("utf-8"))
    return f.encrypt(plaintext.encode("utf-8")).decode("utf-8")


def decrypt_with_key(key: str, token: str) -> str:
    """Descifra un token Fernet y devuelve el texto claro."""
    f = Fernet(key.encode("utf-8"))
    return f.decrypt(token.encode("utf-8")).decode("utf-8")


if __name__ == "__main__":
    # Ejemplo de uso rápido
    pw = "admin123"
    print("Password original:", pw)

    hashed = hash_password(pw)
    print("Hashed (base64):", hashed)
    print("Verificación correcta?:", verify_password(pw, hashed))
    print("Verificación con otra contraseña?:", verify_password("otra", hashed))

    # Ejemplo Fernet (encriptar / desencriptar)
    key = generate_fernet_key()
    print("Fernet key:", key)

    secret = "Secreto muy importante"
    token = encrypt_with_key(key, secret)
    print("Token encriptado:", token)

    decrypted = decrypt_with_key(key, token)
    print("Descifrado:", decrypted)