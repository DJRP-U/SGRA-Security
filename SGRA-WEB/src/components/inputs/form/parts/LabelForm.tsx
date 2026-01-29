interface LabelFormProps {
  htmlFor: string
  label: string
  required?: boolean
}

export function LabelForm({ htmlFor, label, required }: LabelFormProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-neutral-500 font-medium flex text-base"
    >
      {label}
      {required && <span className="text-red-600 font-bold ml-0.5">*</span>}
    </label>
  )
}
