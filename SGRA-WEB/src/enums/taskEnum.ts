export enum TaskStatus {
    PENDING = "PENDIENTE",
    ASSIGNED = "ASIGNADA",
    IN_PROGRESS = "EN_PROGRESO",
    PENDING_REVIEW = "PENDIENTE_POR_REVISAR",
    CHANGES_REQUIRED = "AJUSTES_REQUERIDOS",
    COMPLETED = "COMPLETADA",
}


export enum TaskType {
    ANALYSIS_REFINEMENT = "Análisis y refinamiento",
    DESIGN = "Diseño",
    IMPLEMENTATION = "Implementación",
    VERIFICATION_VALIDATION = "Verificación y validación",
    CHANGE_CONTROL = "Control y cambio",
    MANAGEMENT_TRACKING = "Gestión y seguimiento",
}
