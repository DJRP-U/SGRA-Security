import { ReactNode } from "react";

type SubtitleProps = {
  children: ReactNode;
};

export default function Subtitle({ children }: SubtitleProps) {
  return (
    <h2 className="text-2xl text-neutral-600 font-semibold tracking-tighter">
      {children}
    </h2>
  );
}
