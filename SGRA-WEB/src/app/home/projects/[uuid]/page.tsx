import { redirect } from "next/navigation";

export default async function ProjectDetailScreen ({ params }: { params: { uuid: string } }) {
    
    const { uuid } = await  params;

    redirect("/home/projects/"+ uuid + "/actions");
}