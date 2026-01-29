"use client";
import { recoveryPasswordSchema } from "@/schemas/loginSchemas";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import TextInputForm from "../inputs/form/TextInputForm";
import { useRecoveryAccount } from "@/hooks/account/useRecoveryAccount";
import { recoveryPasswordFormData } from "@/tipos/loginTipos";
import ButtonForm from "../buttons/FormButton";

export default function RecoveryAccountForm() {

    const { recovery } = useRecoveryAccount();

    const { register, handleSubmit, formState: { errors } } = useForm<recoveryPasswordFormData>({
        resolver: zodResolver(recoveryPasswordSchema),
    });

    return (
        <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(recovery)}
        >
            <TextInputForm
                label=""
                id="email"
                placeholder="Escribe tu correo electrónico"
                type="email"
                register={register("email")}
                error={errors.email}
            />
            <ButtonForm
                label="Restablecer contraseña"
            />
        </form>
    );

}