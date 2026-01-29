import { changeRoleUserProjectSchema, projectSchema, roleProjectSchema } from "@/schemas/projectSchema";
import z from "zod";

export type ProjectFormData = z.infer<typeof projectSchema>;
export type RoleProjectFormData = z.infer<typeof roleProjectSchema>;
export type ChangeRoleUserProjectFormData = z.Infer<typeof changeRoleUserProjectSchema>;

export type ProjectInfo = {
    uuid: string
    name: string
}

export type ProjectRole = {
    uid: string
    name: string
    description: string
}