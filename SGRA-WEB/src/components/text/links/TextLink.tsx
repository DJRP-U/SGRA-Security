import Link from "next/link";

interface Props {
  text: string;
  linkText: string;
  href: string;
}

export default function TextLink({ text, linkText, href }: Props) {
  return (
    <p className="text-base text-neutral-500 text-center tracking-tighter">
      {text}{" "}
      <Link
        href={href}
        className="text-blue-400 font-medium hover:underline transition-colors hover:text-blue-500"
      >
        {linkText}
      </Link>
    </p>
  );
}