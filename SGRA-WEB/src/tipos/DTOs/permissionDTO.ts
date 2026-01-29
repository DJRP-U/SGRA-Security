
export type Permission = {
    uuid: string;
    nombre: string;
    descripcion: string;
    seccion: "Requisitos" | "Historias" | "Tareas" | "Defectos" | "Proyecto" | "Sprint" | "Requisito";
};