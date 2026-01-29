# Documentación de Endpoints - Proyecto SGRA

A continuación, se detalla la lista de todos los endpoints disponibles en el backend, junto con su método HTTP, ruta, carga útil (payload) requerida y los permisos o roles necesarios.

---

## Índice
- [Proyectos](#proyectos)
- [Cuentas](#cuentas)
- [Cuenta-Proyectos](#cuenta-proyectos)
- [Roles](#roles)
- [Roles de Proyecto](#roles-de-proyecto)
- [Solicitudes](#solicitudes)
- [Requisitos](#requisitos)
- [Historias de Usuario](#historias-de-usuario)
- [Tareas](#tareas)
- [Sprints](#sprints)
- [Defectos](#defectos)
- [Ejemplos](#ejemplos)

---

## Proyectos

### `POST` /proyectos/
- **Descripción**: Crear un nuevo proyecto.
- **Roles/Permisos**: -
- **Payload**: `ProyectoCreate`
```json
{
  "codigo": "string",
  "nombre": "string",
  "descripcion": "string (opcional)",
  "fecha_inicio": "date (opcional)",
  "fecha_fin": "date (opcional)",
  "tipo": "TipoProyecto (Enum)",
  "uuid_usuario": "string"
}
```

### `GET` /proyectos/
- **Descripción**: Listar todos los proyectos.
- **Roles/Permisos**: -
- **Payload**: -

### `GET` /proyectos/por-usuario/{usuario_uuid}
- **Descripción**: Listar proyectos de un usuario específico.
- **Roles/Permisos**: -
- **Payload**: -

### `GET` /proyectos/{proyecto_uuid}
- **Descripción**: Obtener detalles de un proyecto.
- **Roles/Permisos**: -
- **Payload**: -

### `PUT` /proyectos/{proyecto_uuid}
- **Descripción**: Actualizar información de un proyecto.
- **Roles/Permisos**: -
- **Payload**: `ProyectoUpdate`
```json
{
  "codigo": "string (opcional)",
  "nombre": "string (opcional)",
  "descripcion": "string (opcional)",
  "fecha_inicio": "date (opcional)",
  "fecha_fin": "date (opcional)",
  "estado": "EstadoProyecto (Enum, opcional)",
  "estado_actual": "EstadoActualProyecto (Enum, opcional)",
  "tipo": "TipoProyecto (Enum, opcional)"
}
```

### `DELETE` /proyectos/{proyecto_uuid}
- **Descripción**: Eliminar un proyecto.
- **Roles/Permisos**: -
- **Payload**: -

### `POST` /proyectos/agregar-usuario
- **Descripción**: Agregar un usuario a un proyecto.
- **Roles/Permisos**: -
- **Query Params**: `uuid_proyecto`, `uuid_usuario`

### `GET` /proyectos/miembros/{proyecto_uuid}
- **Descripción**: Listar miembros de un proyecto.
- **Roles/Permisos**: -
- **Payload**: -

---

## Cuentas

### `POST` /cuenta/cambiar-rol
- **Descripción**: Cambiar el rol global de un usuario.
- **Roles/Permisos**: -
- **Payload**: `CambiarRol`
```json
{
  "uuid_usuario": "string",
  "rol_nombre": "string"
}
```

### `POST` /cuenta/{cuenta_id}/desactivar
- **Descripción**: Desactivar una cuenta (cambiar estado a INACTIVO).
- **Roles/Permisos**: -
- **Payload**: -

### `POST` /cuenta/login
- **Descripción**: Iniciar sesión.
- **Roles/Permisos**: -
- **Payload**: `LoginRequest`
```json
{
  "correo": "user@example.com",
  "contrasena": "string"
}
```

### `GET` /cuenta/me
- **Descripción**: Obtener información del usuario actual.
- **Roles/Permisos**: `get_current_user` (Autenticado)
- **Payload**: -

### `GET` /cuenta/usuarios
- **Descripción**: Listar todos los usuarios.
- **Roles/Permisos**: -
- **Payload**: -

### `POST` /cuenta/{cuenta_uuid}/estado
- **Descripción**: Actualizar estado de una cuenta.
- **Roles/Permisos**: -
- **Payload**: `EstadoCuentaUpdate`
```json
{
  "estadoCuenta": "ACTIVO | INACTIVO"
}
```

---

## Cuenta-Proyectos

### `GET` /cuenta-proyectos/
- **Descripción**: Listar relaciones cuenta-proyecto.
- **Roles/Permisos**: -
- **Payload**: -

### `GET` /cuenta-proyectos/obtener_unica
- **Descripción**: Obtener una relación cuenta-proyecto específica.
- **Roles/Permisos**: -
- **Query Params**: `uuid_usuario`, `uuid_proyecto`

---

## Roles

### `GET` /rol/roles
- **Descripción**: Listar todos los roles del sistema.
- **Roles/Permisos**: -
- **Payload**: -

---

## Roles de Proyecto

### `POST` /rol-proyectos/
- **Descripción**: Crear un nuevo rol de proyecto.
- **Roles/Permisos**: -
- **Payload**: `RolProyectoCreate`
```json
{
  "nombre": "string",
  "descripcion": "string (opcional)",
  "permisos_uuids": ["string"],
  "proyecto_uuid": "string"
}
```

### `POST` /rol-proyectos/permiso
- **Descripción**: Crear un nuevo permiso.
- **Roles/Permisos**: -
- **Payload**: `PermisoCreate`
```json
{
  "nombre": "string",
  "descripcion": "string (opcional)"
}
```

### `POST` /rol-proyectos/asignar-permiso
- **Descripción**: Asignar un permiso a un rol.
- **Roles/Permisos**: -
- **Query Params**: `rol_uuid`, `permiso_uuid`

### `POST` /rol-proyectos/asignar-rol-cuenta
- **Descripción**: Asignar rol a una cuenta en un proyecto.
- **Roles/Permisos**: -
- **Payload**: `AsignarRolCuentaProyecto` (Falta Schema en análisis previo, inferido del nombre)
```json
{
  "cuenta_uuid": "string",
  "proyecto_uuid": "string",
  "rol_uuid": "string"
}
```

### `GET` /rol-proyectos/por-proyecto/{uuid_proyecto}
- **Descripción**: Listar roles de un proyecto.
- **Roles/Permisos**: -
- **Payload**: -

### `GET` /rol-proyectos/
- **Descripción**: Listar permisos existentes.
- **Roles/Permisos**: -
- **Payload**: -

### `GET` /rol-proyectos/rol_proyectos
- **Descripción**: Listar todos los roles de proyectos.
- **Roles/Permisos**: -
- **Payload**: -

### `GET` /rol-proyectos/usuarios-por-proyecto/{uuid_proyecto}
- **Descripción**: Listar usuarios con roles en un proyecto.
- **Roles/Permisos**: -
- **Payload**: -

---

## Solicitudes

### `POST` /solicitud/crear-solicitud
- **Descripción**: Crear una solicitud de registro.
- **Roles/Permisos**: -
- **Payload**: `CreateSolicitud`
```json
{
  "nombre": "string",
  "apellido": "string",
  "correo": "user@example.com",
  "contrasena": "string"
}
```

### `POST` /solicitud/responder
- **Descripción**: Responder a una solicitud (Aceptar/Rechazar).
- **Roles/Permisos**: -
- **Payload**: `schema_solicitud_cuenta`
```json
{
  "uuid_usuario": "string",
  "decision": "EstadoSolicitudEnum (ACEPTADO/RECHAZADO)"
}
```

### `GET` /solicitud/
- **Descripción**: Listar solicitudes paginadas.
- **Roles/Permisos**: -
- **Query Params**: `page`, `page_size`

### `POST` /solicitud/recuperar-password
- **Descripción**: Recuperar contraseña.
- **Roles/Permisos**: -
- **Payload**: `RecuperarPasswordRequest`
```json
{
  "email": "user@example.com"
}
```

---

## Requisitos

### `GET` /requisito/obtener-identificador
- **Descripción**: Obtener siguiente identificador disponible.
- **Roles/Permisos**: -
- **Payload**: `Obtener_Identificador`
```json
{
  "proyecto_uuid": "string",
  "tipo_requisito": "TipoRequisitoEnum"
}
```

### `POST` /requisito/guardar-requisito
- **Descripción**: Guardar un nuevo requisito.
- **Roles/Permisos**: -
- **Payload**: `schema_guardar_requisito`
```json
{
  "proyecto_uuid": "string",
  "nombre": "string",
  "descripcion": "string",
  "tipo_requisito": "TipoRequisitoEnum",
  "prioridad": "PrioridadRequisitoEnum",
  "fuente": "string (opcional)",
  "metodo_verificacion": "string (opcional)",
  "categoria": "string (opcional)",
  "horas_esfuerzo_estimado": "int (opcional)",
  "riesgo": "string (opcional)",
  "comentarios": "string (opcional)"
}
```

### `POST` /requisito/modificar-requisito
- **Descripción**: Modificar un requisito existente.
- **Roles/Permisos**: -
- **Payload**: `schema_modificar_requisito`
```json
{
  "requisito_uuid": "string",
  "nombre": "string",
  "descripcion": "string",
  "tipo_requisito": "TipoRequisitoEnum",
  "prioridad": "PrioridadRequisitoEnum",
  "fuente": "string (opcional)",
  "metodo_verificacion": "string (opcional)",
  "categoria": "string (opcional)",
  "horas_esfuerzo_estimado": "int (opcional)",
  "riesgo": "string (opcional)",
  "comentarios": "string (opcional)"
}
```

### `PATCH` /requisito/cambiar-estado
- **Descripción**: Cambiar estado de un requisito.
- **Roles/Permisos**: -
- **Payload**: `schema_cambiar_estado_requisito`
```json
{
  "requisito_uuid": "string",
  "nuevo_estado": "EstadoRequisitoEnum",
  "razon_obsoleto": "string (opcional)"
}
```

---

## Historias de Usuario

### `POST` /historias_usuario/crear
- **Descripción**: Crear historia de usuario.
- **Roles/Permisos**: -
- **Payload**: `HistoriaUsuarioCreate`
```json
{
  "titulo": "string (min 40 chars)",
  "descripcion": "string (min 60 chars)",
  "prioridad": "Prioridad (Enum)",
  "criterios_aceptacion": "string",
  "estimacion": "int (>0)",
  "uuids_requisitos": ["string"],
  "uuid_responsable": "string (opcional)",
  "uuid_creador": "string"
}
```

### `DELETE` /historias_usuario/eliminar
- **Descripción**: Eliminar historia de usuario.
- **Roles/Permisos**: -
- **Payload**: `EliminarHistoriaUsuario`
```json
{
  "uuid_historia": "string",
  "uuid_creador": "string"
}
```

### `GET` /historias_usuario/listar/{proyecto_uuid}
- **Descripción**: Listar historias por proyecto.
- **Roles/Permisos**: -
- **Query Params**: `page`, `page_size`

### `GET` /historias_usuario/sprint/{sprint_uuid}
- **Descripción**: Listar historias de un sprint.
- **Roles/Permisos**: `get_current_user`
- **Payload**: -

### `POST` /historias_usuario/agregar-a-sprint
- **Descripción**: Agregar historia a sprint.
- **Roles/Permisos**: `get_current_user`
- **Payload**: `HistoriaUsuarioAgregarASprint`
```json
{
  "uuid_historia": "string",
  "uuid_sprint": "string"
}
```

### `POST` /historias_usuario/quitar-de-sprint
- **Descripción**: Quitar historia de sprint.
- **Roles/Permisos**: `get_current_user`
- **Payload**: `HistoriaUsuarioQuitarDeSprint`
```json
{
  "uuid_historia": "string",
  "uuid_sprint": "string"
}
```

### `PUT` /historias_usuario/editar
- **Descripción**: Editar historia de usuario.
- **Roles/Permisos**: -
- **Payload**: `EditarHistoriaUsuario`
```json
{
  "uuid_historia": "string",
  "uuid_creador": "string",
  "datos": {
    "titulo": "string (opcional)",
    "descripcion": "string (opcional)",
    "prioridad": "Prioridad (opcional)",
    "criterios_aceptacion": "string (opcional)",
    "estimacion": "int (opcional)",
    "uuids_requisitos": ["string"] (opcional),
    "estado": "Estado (opcional)"
  }
}
```

### `PATCH` /historias_usuario/cambiar-estado
- **Descripción**: Cambiar estado de historia de usuario.
- **Roles/Permisos**: -
- **Payload**: `Schema_CambiarEstadoHistoriaUsuario`
```json
{
  "uuid_historia": "string",
  "nuevo_estado": "Estado (Enum)"
}
```

---

## Tareas

### `GET` /tarea/listar/{hu_uuid}
- **Descripción**: Listar tareas de una historia de usuario.
- **Roles/Permisos**: -
- **Payload**: -

### `POST` /tarea/crear
- **Descripción**: Crear tarea.
- **Roles/Permisos**: -
- **Payload**: `Guardar_tarea`
```json
{
  "titulo": "string",
  "descripcion": "string (opcional)",
  "criterios_entrada": "string (opcional)",
  "criterios_salida": "string (opcional)",
  "fecha_limite": "datetime (opcional)",
  "tipo_tarea": "string (opcional)",
  "estimacion_horas": "int (opcional)",
  "prioridad": "PrioridadTareaEnum",
  "historia_usuario_uuid": "string",
  "cuenta_proyecto_uuid": "string (opcional)"
}
```

### `PUT` /tarea/modificar/{uuid}
- **Descripción**: Modificar tarea.
- **Roles/Permisos**: -
- **Payload**: `Modificar_tarea`
```json
{
  "titulo": "string (opcional)",
  "descripcion": "string (opcional)",
  "criterios_entrada": "string (opcional)",
  "criterios_salida": "string (opcional)",
  "fecha_limite": "datetime (opcional)",
  "tipo_tarea": "string (opcional)",
  "estimacion_horas": "int (opcional)",
  "prioridad": "PrioridadTareaEnum",
  "cuenta_proyecto_uuid": "string (opcional)",
  "responsable_cambio_uuid": "string"
}
```

### `PATCH` /tarea/cambiar-estado/{uuid}
- **Descripción**: Cambiar estado de tarea.
- **Roles/Permisos**: -
- **Payload**: `Cambiar_estado_tarea`
```json
{
  "nuevo_estado": "EstadoTareaEnum",
  "responsable_cambio_uuid": "string"
}
```

### `DELETE` /tarea/eliminar/{uuid}
- **Descripción**: Eliminar tarea.
- **Roles/Permisos**: -
- **Payload**: -

---

## Sprints

### `POST` /sprints/
- **Descripción**: Crear sprint.
- **Roles/Permisos**: -
- **Payload**: `SprintCreate`
```json
{
  "nombre": "string (3-100 chars)",
  "fecha_inicio": "date",
  "fecha_fin": "date",
  "objetivo": "string (10-500 chars)",
  "uuid_proyecto": "string"
}
```

### `GET` /sprints/proyecto/{proyecto_uuid}
- **Descripción**: Listar sprints de un proyecto.
- **Roles/Permisos**: -
- **Payload**: -

### `PUT` /sprints/{sprint_uuid}
- **Descripción**: Actualizar sprint.
- **Roles/Permisos**: `get_current_user`
- **Payload**: `SprintUpdate`
```json
{
  "nombre": "string (opcional)",
  "fecha_inicio": "date (opcional)",
  "fecha_fin": "date (opcional)",
  "objetivo": "string (opcional)",
  "estado": "EstadoSprint (opcional)"
}
```

### `PATCH` /sprints/{sprint_uuid}/estado
- **Descripción**: Cambiar estado de sprint.
- **Roles/Permisos**: `get_current_user`
- **Payload**: `SprintCambiarEstado`
```json
{
  "nuevo_estado": "EstadoSprint"
}
```

### `DELETE` /sprints/{sprint_uuid}
- **Descripción**: Eliminar sprint.
- **Roles/Permisos**: -
- **Payload**: -

### `POST` /sprints/asignar-historia
- **Descripción**: Asignar historia a sprint.
- **Roles/Permisos**: -
- **Payload**: `AsignarHistoriaSprint`
```json
{
  "sprint_uuid": "string",
  "historia_uuid": "string",
  "uuid_creador": "string"
}
```

### `POST` /sprints/remover-historia
- **Descripción**: Remover historia de sprint.
- **Roles/Permisos**: -
- **Payload**: `RemoverHistoriaSprint`
```json
{
  "sprint_uuid": "string",
  "historia_uuid": "string",
  "uuid_creador": "string"
}
```

---

## Defectos

### `POST` /defectos/
- **Descripción**: Crear defecto.
- **Roles/Permisos**: `get_current_user`
- **Payload**: `DefectoCreate`
```json
{
  "titulo": "string (min 5 chars)",
  "descripcion": "string (opcional)",
  "severidad": "TipoSeveridadEnum",
  "historia_usuario_uuid": "UUID",
  "fecha_limite": "datetime (opcional)"
}
```

### `PUT` /defectos/{defecto_uuid}
- **Descripción**: Modificar defecto.
- **Roles/Permisos**: `get_current_user`
- **Payload**: `DefectoUpdate`
```json
{
  "titulo": "string (min 5 chars, opcional)",
  "descripcion": "string (opcional)",
  "severidad": "TipoSeveridadEnum (opcional)",
  "fecha_limite": "datetime (opcional)"
}
```

### `PATCH` /defectos/{defecto_uuid}/estado
- **Descripción**: Cambiar estado de defecto.
- **Roles/Permisos**: `get_current_user`
- **Payload**: `DefectoEstadoUpdate`
```json
{
  "estado": "EstadoDefectoEnum",
  "comentario": "string (opcional)"
}
```

### `PATCH` /defectos/{defecto_uuid}/asignar
- **Descripción**: Asignar encargado a defecto.
- **Roles/Permisos**: `get_current_user`
- **Payload**: `DefectoAsignarEncargado`
```json
{
  "cuenta_proyecto_uuid": "UUID"
}
```

### `DELETE` /defectos/{defecto_uuid}
- **Descripción**: Eliminar defecto.
- **Roles/Permisos**: `get_current_user`
- **Payload**: -

---

## Ejemplos

### `POST` /ejemplos/
- **Descripción**: Crear ejemplo (Requiere permiso).
- **Roles/Permisos**: `require_project_permission("crear-tareas")`
- **Payload**: `EjemploCreate`
```json
{
  "nombre": "string",
  "descripcion": "string (opcional)"
}
```
