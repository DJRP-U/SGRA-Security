"use client";
import Button from "@/components/buttons/Button";
import ButtonForm from "@/components/buttons/FormButton"; // Cambiado para soportar loading
import ProjectUserAutocomplete from "@/components/inputs/ProjectUserAutocomplete";

interface AssignResponsibleFormProps {
    onSubmit: () => void;
    emailMember: string;
    setEmailMember: (value: string) => void;
    setSelectedUserId: (uuid: string) => void;
    onCancel: () => void;
    projectUuid: string;
    isSubmitting?: boolean; // Prop agregada
}

export default function AssignResponsibleForm({
    onSubmit,
    emailMember,
    setEmailMember,
    setSelectedUserId,
    onCancel,
    projectUuid,
    isSubmitting = false, // Valor por defecto
}: AssignResponsibleFormProps) {
    return (
        <section className="w-full flex flex-col gap-2 pt-2">
            <ProjectUserAutocomplete
                label="Responsable"
                id="responsible-autocomplete"
                placeholder="Busca por nombre o correo..."
                projectUuid={projectUuid}
                value={emailMember}
                onChange={setEmailMember}
                onSelectedIdChange={setSelectedUserId}
                required
            />

            <div className="flex justify-end gap-1 mt-4">
                <Button
                    label="Cancelar"
                    onClick={onCancel}
                    secondary
                    disabled={isSubmitting} // Evitar cierre accidental
                />
                <ButtonForm
                    label="Asignar"
                    onClick={onSubmit}
                    loading={isSubmitting} // Mostrar spinner
                />
            </div>
        </section>
    );
}