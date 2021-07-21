/*
 * Enum field for distinguishing between reports.
 * */
export const enum AnalysisType {
  BadgeAnalysis,
  TokenAnalysis,
}

/*
 * Enum field for distinguishing between the various states encountered during the upload report procedure.
 * */
export const enum StateOption {
  DEFAULT,
  MODIFIED,
  PARTIAL_COMPLETION,
  DAMAGED,
  COMPLETED,
  ERROR,
  QUARANTINED,
}

/*
 * Declaring a type that represents the state options as strings instead of their numeric enum value.
 * */
export type StateOptionStrings = keyof typeof StateOption;

/*
 * State management interface declaration for the badge level.
 * */
export interface BadgeAnalysis {
  type: AnalysisType.BadgeAnalysis;
  state: StateOptionStrings;
}

/*
 * State management interface declarations for the token level.
 * */
export interface TokenAnalysis {
  type: AnalysisType.TokenAnalysis;
  state: StateOptionStrings;
}
