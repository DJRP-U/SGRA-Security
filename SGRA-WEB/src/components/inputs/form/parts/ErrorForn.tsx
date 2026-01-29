interface ErrorFormProps {
  message?: string
}

export function ErrorForm({ message }: ErrorFormProps) {
  return (
    <span
      className={`text-sm m-0 p-0 ${
        message ? "text-red-600" : "invisible"
      }`}
    >
      {message ?? "error"}
    </span>
  )
}
