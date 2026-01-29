import { ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
};

export default function Title({ children }: TitleProps) {
  return (
    <h1 className="text-3xl text-neutral-600 font-semibold tracking-tighter">
      {children}
    </h1>
  );
}
