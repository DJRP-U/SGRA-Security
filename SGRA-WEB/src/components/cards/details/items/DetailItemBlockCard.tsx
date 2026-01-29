import { ReactNode } from "react";

interface DetailItemBlockCardProps {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}

export default function DetailItemBlockCard({ icon, label, children }: DetailItemBlockCardProps) {
  return (
    <li className="flex flex-col text-neutral-500 gap-2">
      <div className="flex items-center text-base gap-1">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-neutral-600 w-full text-lg">
        {children}
      </div>
    </li>
  );
}
