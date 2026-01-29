import { ProjectCurrentStatus } from "@/enums/projectEnum";

export default function getStatusBgColor(status: ProjectCurrentStatus): string {
  switch (status) {
    case ProjectCurrentStatus.PROPOSAL:
      return "bg-sky-200";
    case ProjectCurrentStatus.PLANNING:
      return "bg-blue-300";
    case ProjectCurrentStatus.EXECUTION:
      return "bg-orange-200";
    case ProjectCurrentStatus.PAUSED:
      return "bg-purple-300";
    case ProjectCurrentStatus.COMPLETED:
      return "bg-green-300"; 
    default:
      return "";
  }
}

export const PAGE_SIZE_PAGINATION = 10;