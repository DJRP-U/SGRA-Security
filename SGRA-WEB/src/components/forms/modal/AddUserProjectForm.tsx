"use client";
import Button from "@/components/buttons/Button";
import ButtonForm from "@/components/buttons/FormButton"; // Importamos ButtonForm
import AccountEmailAutocomplete from "@/components/inputs/AccountEmailAutocomplete";

interface AddUserProjectFormProps {
    onSubmit: () => void
    emailMember: string
    setEmailMember: (value: string) => void
    setSelectedAccountId: (values: string) => void
    onCancel: () => void
    isSubmitting?: boolean; // Prop agregada
}

export default function AddUserProjectForm({
    onSubmit,
    emailMember,
    setEmailMember,
    setSelectedAccountId,
    onCancel,
    isSubmitting = false
}: AddUserProjectFormProps) {

    return (
        <section className="w-full flex flex-col gap-2 pt-2">
            <AccountEmailAutocomplete
                label="Correo Electrónico"
                id="member"
                placeholder="Ejemplo, miguel.apolo@unl.edu.ec"
                value={emailMember}
                onChange={setEmailMember}
                onSelectedIdChange={setSelectedAccountId}
                width="w-full"
                required
            />
            <div className="flex justify-end gap-1 mt-4">
                <Button
                    className="text-neutral-400 hover:text-neutral-400"
                    label="Cancelar"
                    onClick={onCancel}
                    secondary
                    disabled={isSubmitting}
                />
                <ButtonForm
                    label="Añadir"
                    onClick={onSubmit}
                    loading={isSubmitting}
                />
            </div>
        </section>
    );
}