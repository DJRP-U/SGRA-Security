import { ReactNode } from "react";

type SubtitleProps = {
  children: ReactNode;
};

export default function SectionTitle({ children }: SubtitleProps) {
  return (
    <h2 className="text-lg text-neutral-400 font-medium tracking-tighter">
      {children}
    </h2>
  );
}
