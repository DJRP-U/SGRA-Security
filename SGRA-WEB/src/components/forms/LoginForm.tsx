"use client";
import { loginSchema } from "@/schemas/loginSchemas";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import TextInputForm from "../inputs/form/TextInputForm";
import { LoginFormData } from "@/tipos/loginTipos";
import ButtonForm from "../buttons/FormButton";
import { useLogin } from "@/hooks/auth/useLogin";


export default function LoginForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const { onSubmit, loading } = useLogin();

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-2">
                <TextInputForm
                    label="Correo electrónico"
                    id="correoElectronico"
                    placeholder="Escriba su correo electrónico"
                    type="email"
                    register={register("correo")}
                    error={errors.correo}
                    required
                />
                <TextInputForm
                    label="Contraseña"
                    id="contrasena"
                    placeholder="Escriba su contraseña"
                    type="password"
                    register={register("contrasena")}
                    error={errors.contrasena}
                    required
                />
            </div>
            <ButtonForm
                label="Iniciar sesión"
                loading={loading}
            />
        </form>
    );

}