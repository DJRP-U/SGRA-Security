"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextInputForm from "../inputs/form/TextInputForm";
import TextAreaInputForm from "../inputs/form/TextAreaForm";
import SelectInputForm from "../inputs/form/SelectInputForm";
import { enumToOptions } from "@/utils/transform";
import { userStorySchema } from "@/schemas/useStorySchema";
import { UserStoryFormData } from "@/tipos/userStoryType";
import ButtonForm from "../buttons/FormButton";
import Button from "../buttons/Button";
import { Priority } from "@/enums/baseEnum";
import { EstimationPoints } from "@/enums/points";

type Props = {
    onSubmit: (data: UserStoryFormData) => void
    onCancel: () => void
    defaultValues?: Partial<UserStoryFormData>
    textButton: string
    isSubmitting?: boolean // <-- Agrega esto
};

const PRIORITY_USER_STORY_TYPES = enumToOptions(Priority);
const ESTIMATION_POINTS_OPTIONS = enumToOptions(EstimationPoints);

export default function UserStoryForm({
    onSubmit,
    defaultValues,
    textButton,
    onCancel,
    isSubmitting = false
}: Props) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserStoryFormData>({
        resolver: zodResolver(userStorySchema),
        defaultValues,
    });


    return (
        <form
            className="grid grid-cols-2 gap-x-2 gap-y-1"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="col-span-2">
                <TextInputForm
                    label="Título"
                    id="titulo"
                    placeholder="Escriba el título de la historia de usuario (ej. Registro de usuarios)"
                    type="text"
                    register={register("titulo")}
                    error={errors.titulo}
                    width="h-full"
                    required
                />
            </div>

            <SelectInputForm
                label="Prioridad"
                id="prioridad"
                placeholder="Seleccione una opción"
                options={PRIORITY_USER_STORY_TYPES}
                register={register("prioridad")}
                error={errors.prioridad}
                width="min-w-3xs max-w-3xs"
                required
            />

            <SelectInputForm
                label="Estimación (puntos)"
                id="estimacion"
                placeholder="Seleccione la estimación"
                options={ESTIMATION_POINTS_OPTIONS}
                register={register("estimacion")}
                error={errors.estimacion}
                width="min-w-3xs max-w-3xs"
                required
            />

            <div className="col-span-2">
                <TextAreaInputForm
                    label="Descripción"
                    id="descripcion"
                    placeholder="Describa la historia de usuario (ej. Como administrador, quiero registrar productos para poder gestionarlos)"
                    register={register("descripcion")}
                    error={errors.descripcion}
                    width="w-full"
                    required
                    rows={4}
                />
            </div>

            <div className="col-span-2">
                <TextAreaInputForm
                    label="Criterios de aceptación"
                    id="criterios_aceptacion"
                    placeholder="Defina las condiciones que deben cumplirse para considerar la historia como completada"
                    register={register("criterios_aceptacion")}
                    error={errors.criterios_aceptacion}
                    width="w-full"
                    required
                    rows={4}
                />
            </div>

            <div className="col-span-2 flex justify-end gap-1">
                <Button
                    onClick={onCancel}
                    label="Cancelar"
                    secondary
                    disabled={isSubmitting}
                />
                <ButtonForm
                    label={textButton}
                    loading={isSubmitting}
                />
            </div>
        </form>
    );
}
