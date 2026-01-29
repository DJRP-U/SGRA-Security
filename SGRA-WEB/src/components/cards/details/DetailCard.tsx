
interface DetailCardProps {
  identifier?: string
  children: React.ReactNode
  className?: string
  width?: string
}

export default function DetailCard({
  identifier,
  children,
  className = "",
  width = "max-w-md"
}: DetailCardProps) {
  console.log(width)
  return (
    <ul className={`flex flex-col gap-2 ${className} ${width}`}>
      {identifier && (
        <li className="text-base text-neutral-400">
          #{identifier}
        </li>
      )}
      {children}
    </ul>
  );
}
