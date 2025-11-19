export type RegistrationStatus = "PENDING" | "APPROVED" | "REJECTED";

// Runtime constants to preserve the enum-like values
export const RegistrationStatus = {
  PENDING: "PENDING" as RegistrationStatus, // 審核中
  APPROVED: "APPROVED" as RegistrationStatus, // 已核准
  REJECTED: "REJECTED" as RegistrationStatus, // 未核准
} as const;
