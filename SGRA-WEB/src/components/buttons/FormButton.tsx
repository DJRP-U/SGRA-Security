import { LoaderCircle } from "lucide-react";
import BaseButton from "./base/BaseButton";

interface Props {
  label: string
  className?: string
  loading?: boolean
  secondaty?: boolean
  onClick?: () => void
  disabled?: boolean
}

export default function ButtonForm({
  label,
  className,
  loading = false,
  secondaty = false,
  onClick,
  disabled = false
}: Props) {
  return (
    <BaseButton
      className={className}
      disabled={loading || disabled}
      secondary={secondaty}
      onClick={onClick}
    >
      {loading && <LoaderCircle size={16} className="animate-spin" />}
      <span>{label}</span>
    </BaseButton>
  );
}
