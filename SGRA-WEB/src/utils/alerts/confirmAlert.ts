import Swal from "sweetalert2";

type ConfirmDialogOptions = {
    title: string
    text?: string
    confirmText?: string
    cancelText?: string
};

export function confirmAlert({
    title,
    text = "¿Estás seguro de realizar esta acción?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
}: ConfirmDialogOptions) {

    const baseStyle = "text-lg font-medium rounded-sm px-4 py-2 cursor-pointer";

    return Swal.fire({
        icon: "question",
        iconColor: "#00d492",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        html: `
            <div class="flex flex-col gap-4">
                <h2 class="text-3xl font-semibold text-neutral-700">
                    ${title}
                </h2>
                <p class="text-xl text-neutral-600">
                    ${text}
                </p>
            </div>
        `,
        customClass: {
            popup: "rounded-sm",
            htmlContainer: "text-xl",
            confirmButton:
                `${baseStyle} bg-emerald-400 hover:bg-emerald-500 text-white`,
            cancelButton:
                `${baseStyle} bg-white text-neutral-500 hover:bg-neutral-200 hover:text-neutral-600 m-1`,
        },
        buttonsStyling: false,
    });
}
