import { ReactNode } from "react";

type InfoFormTextProps = {
  children: ReactNode;
};

export default function InfoFormText({ children }: InfoFormTextProps) {
  return (
    <p className="text-lg text-neutral-500 tracking-tighter leading-6">
      {children}
    </p>
  );
}
