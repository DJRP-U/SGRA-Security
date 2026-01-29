import PlusIcon from "../icons/PlusIcon";
import BaseButton from "./base/BaseButton";

interface Props {
  label: string;
  onClick?: () => void;
  className?: string;
}

export default function AddButton({
  label,
  onClick,
  className = "",
}: Props) {
  return (
    <BaseButton onClick={onClick} className={className}>
      <PlusIcon width={20} height={20} />
      <span>{label}</span>
    </BaseButton>
  );
}
