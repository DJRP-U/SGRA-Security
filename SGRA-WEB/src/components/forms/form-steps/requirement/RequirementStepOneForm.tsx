import Button from "@/components/buttons/Button";
import ButtonForm from "@/components/buttons/FormButton"; // Usamos tu componente de carga
import SelectInputForm from "@/components/inputs/form/SelectInputForm";
import TextAreaInputForm from "@/components/inputs/form/TextAreaForm";
import TextInputForm from "@/components/inputs/form/TextInputForm";
import Detail from "@/components/text/content/Detail";
import { Priority } from "@/enums/baseEnum";
import { RequirementType } from "@/enums/requirementEnum";
import { requirementStepOneSchema } from "@/schemas/requirementSchema";
import { RequirementFormData, RequirementStepOneFormData } from "@/tipos/requirementType";
import { enumToOptions } from "@/utils/transform";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon } from "lucide-react";
import { useForm } from "react-hook-form";

const REQUIREMENT_TYPES = enumToOptions(RequirementType);
const PRIORITY_REQUIREMENT_TYPES = enumToOptions(Priority);

interface RequirementStepOneFormProps {
    onNext: (data: RequirementStepOneFormData) => void;
    onSaveDirect?: (data: RequirementStepOneFormData) => void;
    onCancel: () => void;
    defaultValues?: Partial<RequirementFormData>;
    edition?: boolean;
    textButton: string;
    isSubmitting?: boolean
}

export default function RequirementStepOneForm({
    onNext,
    onSaveDirect,
    onCancel,
    defaultValues,
    edition,
    textButton,
    isSubmitting = false,
}: RequirementStepOneFormProps) {
    const { register, handleSubmit, formState: { errors } } =
        useForm<RequirementStepOneFormData>({
            resolver: zodResolver(requirementStepOneSchema),
            defaultValues,
        });

    return (
        <form className="flex flex-col gap-2">
            {edition && (
                <span className="flex items-center text-neutral-500 gap-2 mb-2">
                    <InfoIcon size={16} />
                    <Detail>
                        <span className="text-lg">
                            Cualquier modificación creará una nueva versión del requisito.
                        </span>
                    </Detail>
                </span>
            )}

            <TextInputForm
                label="Nombre"
                id="nombre"
                placeholder="Escriba el nombre del requisito"
                register={register("nombre")}
                error={errors.nombre}
                required
                width="w-full"
            />

            <div className="grid grid-cols-2 gap-x-4">
                <SelectInputForm
                    label="Tipo de requisito"
                    id="tipo_requisito"
                    placeholder="Selecciona el tipo"
                    options={REQUIREMENT_TYPES}
                    register={register("tipo_requisito")}
                    error={errors.tipo_requisito}
                    required
                    width="w-3xs"
                />
                <SelectInputForm
                    label="Prioridad"
                    id="prioridad"
                    placeholder="Selecciona la prioridad"
                    options={PRIORITY_REQUIREMENT_TYPES}
                    register={register("prioridad")}
                    error={errors.prioridad}
                    width="w-3xs"
                    required
                />
            </div>

            <TextAreaInputForm
                label="Descripción"
                id="descripcion"
                placeholder="Describa el comportamiento"
                register={register("descripcion")}
                error={errors.descripcion}
                rows={5}
                required
                width="w-full"
            />

            <div className="flex justify-between mt-4">
                <Button
                    label="Cancelar"
                    onClick={onCancel}
                    secondary
                    disabled={isSubmitting}
                />

                <div className="flex gap-1">
                    <Button
                        label="Siguiente"
                        type="button"
                        onClick={handleSubmit(onNext)}
                        secondary
                        disabled={isSubmitting}
                    />

                    {edition && onSaveDirect && (
                        <ButtonForm
                            label={textButton}
                            onClick={handleSubmit(onSaveDirect)}
                            loading={isSubmitting}
                        />
                    )}
                </div>
            </div>
        </form>
    );
}