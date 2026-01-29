import Detail from "@/components/text/content/Detail";

export default function EmptyMemberState() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center">
      <Detail>
        Aún no estás asignado a ningún proyecto. Espera a que te agreguen a uno.
      </Detail>
    </div>
  );
}
