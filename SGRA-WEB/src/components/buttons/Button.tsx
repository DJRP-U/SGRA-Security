import BaseButton from "./base/BaseButton";

interface Props {
  label: string
  onClick?: () => void
  className?: string
  textSize?: string
  secondary?: boolean
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

export default function Button({ label, onClick, className = "", textSize = "", secondary = false, type="button", disabled = false }: Props) {
  return (
    <BaseButton type={type} onClick={onClick} className={className} textSize={textSize} secondary={secondary} disabled={disabled}>
      {label}
    </BaseButton>
  );
}
