"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toTitleCase } from "@/utils/format";
import SelectInputForm from "@/components/inputs/form/SelectInputForm";
import ButtonForm from "@/components/buttons/FormButton";
import Button from "@/components/buttons/Button";
import { AssignSprintFormData } from "@/tipos/sprintType";
import { assignSprintSchema } from "@/schemas/sprintSchema";
import { SprintDTO } from "@/tipos/DTOs/sprintDTO";

interface AssignSprintFormProps {
    onSubmit: (data: AssignSprintFormData) => void;
    onCancel: () => void;
    sprintOptions: SprintDTO[];
    textButton: string;
    defaultValues?: Partial<AssignSprintFormData>;
    isSubmitting?: boolean; // Prop agregada
}

export default function AssignSprintForm({
    sprintOptions,
    defaultValues,
    textButton,
    onCancel,
    onSubmit,
    isSubmitting = false // Valor por defecto
}: AssignSprintFormProps) {

    const { register, handleSubmit, formState: { errors } } = useForm<AssignSprintFormData>({
        resolver: zodResolver(assignSprintSchema),
        defaultValues,
    });

    const sprints = sprintOptions.map((sprint) => ({
        label: toTitleCase(sprint.nombre),
        value: sprint.uuid
    }));

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
        >
            <SelectInputForm
                label="Sprint"
                id="sprint"
                placeholder="Selecciona el sprint"
                options={sprints}
                register={register("sprint")}
                error={errors.sprint}
                required
                disabled={isSubmitting} // Bloqueamos selección durante envío
            />

            <div className="flex justify-end gap-2 mt-2">
                <Button
                    label="Cancelar"
                    onClick={onCancel}
                    secondary
                    disabled={isSubmitting} // Bloqueamos cancelar durante envío
                />
                <ButtonForm
                    label={textButton}
                    loading={isSubmitting} // Spinner activado
                />
            </div>
        </form>
    );
}