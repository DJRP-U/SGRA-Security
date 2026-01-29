import { ReactNode } from "react";

type DetailProps = {
  children: ReactNode;
};

export default function Detail({ children }: DetailProps) {
  return (
    <p className="text-xl text-neutral-500 tracking-tighter leading-6">
      {children}
    </p>
  );
}
