import Button from "@/components/buttons/Button";
import SelectInputForm from "@/components/inputs/form/SelectInputForm";
import TextAreaInputForm from "@/components/inputs/form/TextAreaForm";
import TextInputForm from "@/components/inputs/form/TextInputForm";
import ButtonForm from "@/components/buttons/FormButton"; // Importamos el botón con loading
import { RequirementCategory, RequirementRisk, RequirementSource, RequirementVerificationMethod } from "@/enums/requirementEnum";
import { requirementStepTwoSchema } from "@/schemas/requirementSchema";
import { RequirementFormData, RequirementStepTwoFormData } from "@/tipos/requirementType";
import { enumToOptions } from "@/utils/transform";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface RequirementStepTwoFormProps {
    onSubmit: (data: RequirementStepTwoFormData) => void
    onBack: (data: RequirementStepTwoFormData) => void
    onCancel: () => void
    defaultValues?: Partial<RequirementFormData>
    textButton: string
    isSubmitting?: boolean // Nueva prop
}

export const REQUIREMENT_VERIFICATION_METHODS = enumToOptions(RequirementVerificationMethod);
export const REQUIREMENT_CATEGORIES = enumToOptions(RequirementCategory);
export const REQUIREMENT_RISKS = enumToOptions(RequirementRisk);
export const REQUIREMENT_SOURCES = enumToOptions(RequirementSource);

export default function RequirementStepTwoForm({
    onSubmit,
    onBack,
    onCancel,
    defaultValues,
    textButton,
    isSubmitting = false, // Valor por defecto
}: RequirementStepTwoFormProps) {
    const { register, handleSubmit, formState: { errors }, getValues } =
        useForm<RequirementStepTwoFormData>({
            resolver: zodResolver(requirementStepTwoSchema),
            defaultValues,
        });

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <SelectInputForm
                label="Método de verificación"
                id="metodo_verificacion"
                placeholder="Selecciona el método de verificación"
                options={REQUIREMENT_VERIFICATION_METHODS}
                register={register("metodo_verificacion")}
                error={errors.metodo_verificacion}
                required
                width="w-full"
            />
            <div className="grid grid-cols-2 gap-x-4">
                <SelectInputForm
                    label="Categoría"
                    id="categoria"
                    placeholder="Selecciona la categoría"
                    options={REQUIREMENT_CATEGORIES}
                    register={register("categoria")}
                    error={errors.categoria}
                    required
                    width="w-3xs"
                />
                <SelectInputForm
                    label="Riesgo"
                    id="riesgo"
                    placeholder="Selecciona el nivel de riesgo"
                    options={REQUIREMENT_RISKS}
                    register={register("riesgo")}
                    error={errors.riesgo}
                    required
                    width="w-3xs"
                />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
                <TextInputForm
                    type="number"
                    label="Horas estimadas"
                    id="horas_esfuerzo_estimado"
                    placeholder="Ej: 1"
                    register={register("horas_esfuerzo_estimado")}
                    error={errors.horas_esfuerzo_estimado}
                    width="w-3xs"
                />
                <SelectInputForm
                    label="Fuente"
                    id="fuente"
                    placeholder="Selecciona la fuente"
                    options={REQUIREMENT_SOURCES}
                    register={register("fuente")}
                    error={errors.fuente}
                    width="w-3xs"
                />
            </div>

            <TextAreaInputForm
                label="Comentarios"
                id="comentarios"
                placeholder="Incluya notas adicionales o aclaraciones relevantes"
                register={register("comentarios")}
                error={errors.comentarios}
                width="w-full"
            />

            <div className="flex justify-between gap-2 mt-4">
                <Button
                    label="Atrás"
                    secondary
                    onClick={() => onBack(getValues())}
                    disabled={isSubmitting} // Deshabilitar si se está enviando
                />
                <div className="flex justify-end gap-2">
                    <Button
                        label="Cancelar"
                        onClick={onCancel}
                        secondary
                        disabled={isSubmitting}
                    />
                    {/* Usamos ButtonForm para mostrar el loading automáticamente */}
                    <ButtonForm
                        label={textButton}
                        loading={isSubmitting}
                    />
                </div>
            </div>
        </form>
    );
}