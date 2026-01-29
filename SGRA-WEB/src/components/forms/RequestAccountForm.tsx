"use client";
import { RequestAccountFormData } from "@/tipos/requestAccountType"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import TextInputForm from "../inputs/form/TextInputForm";
import ButtonForm from "../buttons/FormButton";
import { requestAccountSchema } from "@/schemas/requestAccountSchemas";
import { toast } from "sonner";
import { CreateRequestAccountDTO } from "@/tipos/DTOs/requestAccountDTO";
import { RequestAccountService } from "@/service/requestAccountService";
import { useRouter } from "next/navigation";
import { useState } from "react";


type Props = {
    textButton?: string
}

export default function RequestAccountForm({ textButton = 'Solicitar Cuenta' }: Props) {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<RequestAccountFormData>({
        resolver: zodResolver(requestAccountSchema),
    });

    const onSubmit = async (values: RequestAccountFormData) => {
        setLoading(true);
        const payload: CreateRequestAccountDTO = {
            nombre: values.nombre,
            apellido: values.apellido,
            correo: values.correo,
            contrasena: values.contrasena,
        };
        try {
            await RequestAccountService.create(payload);
            router.push('/auth/request-register/success');
        } catch (error: any) {
            toast.error(error.detail);
        } finally {
            setLoading(false);
        }
    }


    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col gap-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    <TextInputForm
                        label="Nombre"
                        id="name"
                        placeholder="Escriba su nombre"
                        type="text"
                        register={register("nombre")}
                        error={errors.nombre}
                        required
                        width="max-w-3xs"
                    />
                    <TextInputForm
                        label="Apellido"
                        id="lastName"
                        placeholder="Escriba su apellido"
                        type="text"
                        register={register("apellido")}
                        error={errors.apellido}
                        required
                        width="max-w-3xs"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <TextInputForm
                        label="Correo electrónico"
                        id="email"
                        placeholder="Escriba su correo electrónico"
                        type="email"
                        register={register("correo")}
                        error={errors.correo}
                        required
                        width="w-full"
                    />

                    <TextInputForm
                        label="Contraseña"
                        id="password"
                        placeholder="Escriba su contraseña"
                        type="password"
                        register={register("contrasena")}
                        error={errors.contrasena}
                        required
                        width="w-full"
                    />

                    <TextInputForm
                        label="Confirmar contraseña"
                        id="replyPassword"
                        placeholder="Vuelve a escribir la contraseña"
                        type="password"
                        register={register("contrasenaConfirmacion")}
                        error={errors.contrasenaConfirmacion}
                        required
                        width="w-full"
                    />
                </div>
            </div>

            <ButtonForm
                label={textButton}
                loading={loading}
            />
        </form>
    );

}