import { ReactNode } from "react";

interface DetailItemCardProps {
  icon: ReactNode
  label: string
  children: ReactNode
  contentClassName?: string
  cols?: number
}

export default function DetailItemCard({
  icon,
  label,
  children,
  contentClassName,
  cols = 3
}: DetailItemCardProps) {
  return (
    <li className={`grid grid-cols-${cols} items-start`}>
      <div className="flex items-center text-neutral-500 text-base gap-1">
        {icon}
        <span>{label}</span>
      </div>

      <div className="text-lg">
        {contentClassName ? (
          <span className={`px-2 rounded-sm ${contentClassName}`}>
            {children}
          </span>
        ) : (
          <span className="text-neutral-600">
            {children}
          </span>
        )}
      </div>
    </li>
  );
}
