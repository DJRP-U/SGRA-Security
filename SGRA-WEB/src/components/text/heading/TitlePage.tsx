import { ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
};

export default function TitlePage({ children }: TitleProps) {
  return (
    <h1 className="text-4xl text-neutral-600 font-medium tracking-tighter">
      {children}
    </h1>
  );
}
