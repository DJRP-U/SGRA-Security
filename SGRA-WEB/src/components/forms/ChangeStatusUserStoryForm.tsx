"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ButtonForm from "../buttons/FormButton";
import SelectInputForm from "../inputs/form/SelectInputForm";
import { changeStatusUserStorySchema } from "@/schemas/useStorySchema";
import { ChangeStatusUserStoryFormData } from "@/tipos/userStoryType";
import { enumToOptions } from "@/utils/transform";
import { UserStoryStatus } from "@/enums/userStoryEnums";
import Button from "../buttons/Button";

interface ChangeRoleAccountFormProps {
    defaultValues?: Partial<ChangeStatusUserStoryFormData>
    onSubmit: (data: ChangeStatusUserStoryFormData) => void
    onCancel: () => void
    textButton: string
}

const USER_STORY_STATUS = enumToOptions(UserStoryStatus);

export default function ChangeStatusUserStoryForm({ defaultValues, textButton, onSubmit, onCancel }: ChangeRoleAccountFormProps) {

    const { register, handleSubmit, formState: { errors } } = useForm<ChangeStatusUserStoryFormData>({
        resolver: zodResolver(changeStatusUserStorySchema),
        defaultValues,
    });

    return (
        <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
        >
            <SelectInputForm
                label="Estado"
                id="status"
                placeholder="Selecciona el estado de la HU"
                options={USER_STORY_STATUS}
                register={register("status")}
                error={errors.status}
                required
            />
            <div className="flex justify-end gap-1">
                <Button 
                    label="Cancelar"
                    onClick={onCancel}
                    secondary
                />
                <ButtonForm
                    label={textButton}
                />
            </div>
        </form>
    );

}