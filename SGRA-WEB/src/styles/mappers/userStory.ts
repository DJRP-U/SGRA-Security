import { UserStoryStatus } from "@/enums/userStoryEnums";
import { colors, textColors } from "../colors";
import { Priority } from "@/enums/baseEnum";

export const userStoryPriorityStyles: Record<Priority, string> = {
  [Priority.HIGH]: `${colors.danger} ${textColors.labelDetail}`,
  [Priority.MEDIUM]: `${colors.warning} ${textColors.labelDetail}`,
  [Priority.LOW]: `${colors.success} ${textColors.labelDetail}`,
};

export const userStoryStateStyles: Record<UserStoryStatus, string> = {
  [UserStoryStatus.PENDING]: `${colors.weird} ${textColors.labelDetail}`,
  [UserStoryStatus.IN_PROGRESS]: `${colors.info} ${textColors.labelDetail}`,
  [UserStoryStatus.COMPLETED]: `${colors.success} ${textColors.labelDetail}`,
  [UserStoryStatus.DELAYED]: `${colors.warning} ${textColors.labelDetail}`,
  [UserStoryStatus.OBSOLETE]: `${colors.neutral} ${textColors.labelDetail}`,
};