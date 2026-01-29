import { Priority } from "@/enums/baseEnum";
import { RequirementCategory, RequirementRisk, RequirementStatus, RequirementType, RequirementVerificationMethod } from "@/enums/requirementEnum";
import { colors, textColors } from "@/styles/colors";

export const requirementPriorityStyles: Record<Priority, string> = {
  [Priority.HIGH]: `${colors.danger} ${textColors.labelDetail}`,
  [Priority.MEDIUM]: `${colors.warning} ${textColors.labelDetail}`,
  [Priority.LOW]: `${colors.success} ${textColors.labelDetail}`,
};

export const requirementTypeStyles: Record<RequirementType, string> = {
  [RequirementType.FUNCTIONAL]: `${colors.primary} ${textColors.labelDetail}`,
  [RequirementType.NON_FUNCTIONAL]: `${colors.neutral} ${textColors.labelDetail}`,
};

export const requirementStatusStyles: Record<RequirementStatus, string> = {
  [RequirementStatus.PENDING]: `${colors.secondary} ${textColors.labelDetail}`,
  [RequirementStatus.APPROVED]: `${colors.success} ${textColors.labelDetail}`,
  [RequirementStatus.IN_PROGRESS]: `${colors.warning} ${textColors.labelDetail}`,
  [RequirementStatus.FINISHED]: `${colors.success} ${textColors.labelDetail}`,
  [RequirementStatus.REJECTED]: `${colors.danger} ${textColors.labelDetail}`,
  [RequirementStatus.OBSOLETE]: `${colors.neutral} ${textColors.labelDetail}`,
};

// verification
export const requirementVerificationMethodStyles: Record<
  RequirementVerificationMethod,
  string
> = {
  [RequirementVerificationMethod.INSPECTION]: `${colors.info} ${textColors.labelDetail}`,
  [RequirementVerificationMethod.ANALYSIS]: `${colors.primary} ${textColors.labelDetail}`,
  [RequirementVerificationMethod.TEST]: `${colors.success} ${textColors.labelDetail}`,
  [RequirementVerificationMethod.DEMONSTRATION]: `${colors.warning} ${textColors.labelDetail}`,
};

// category
export const requirementCategoryStyles: Record<
  RequirementCategory,
  string
> = {
  [RequirementCategory.FUNCTIONAL_SUITABILITY]: `${colors.primary} ${textColors.labelDetail}`,
  [RequirementCategory.PERFORMANCE_EFFICIENCY]: `${colors.info} ${textColors.labelDetail}`,
  [RequirementCategory.COMPATIBILITY]: `${colors.secondary} ${textColors.labelDetail}`,
  [RequirementCategory.USABILITY]: `${colors.success} ${textColors.labelDetail}`,
  [RequirementCategory.RELIABILITY]: `${colors.warning} ${textColors.labelDetail}`,
  [RequirementCategory.SECURITY]: `${colors.danger} ${textColors.labelDetail}`,
  [RequirementCategory.MAINTAINABILITY]: `${colors.weird} ${textColors.labelDetail}`,
  [RequirementCategory.PORTABILITY]: `${colors.neutral} ${textColors.labelDetail}`,
};

// risk
export const requirementRiskStyles: Record<RequirementRisk, string> = {
  [RequirementRisk.LOW]: `${colors.success} ${textColors.labelDetail}`,
  [RequirementRisk.MEDIUM]: `${colors.warning} ${textColors.labelDetail}`,
  [RequirementRisk.HIGH]: `${colors.danger} ${textColors.labelDetail}`,
  [RequirementRisk.CRITICAL]: `${colors.dubious} ${textColors.labelDetail}`,
};
