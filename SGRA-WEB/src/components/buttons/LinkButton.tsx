import Link from "next/link";
import BaseButton from "./base/BaseButton";
import PlusIcon from "../icons/PlusIcon";

interface Props {
  label: string
  href: string
  className?: string
  showIcon?: boolean
  secondary?: boolean
}

export default function LinkButton({ label, href, className, showIcon = false, secondary }: Props) {
  return (
    <Link href={href}>
      <BaseButton className={className} secondary={secondary}>
        {showIcon && <PlusIcon width={20} height={20} />}
        {label}
      </BaseButton>
    </Link>
  );
}
