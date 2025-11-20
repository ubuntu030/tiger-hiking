import type { RegistrationStatus } from "./registration.model";

// 繳費狀態
export type PaymentStatus = "已收到款項" | "未繳費" | "已退款";

// 山屋床位抽籤狀態
export type BunkLotteryStatus = "已抽中" | "未抽中" | "尚未抽籤" | "候補中";

// 我的活動卡片資料模型
export interface MyActivity {
  id: string; // 報名紀錄的 ID
  activityId: string; // 活動的 ID
  name: string; // 活動名稱
  selectedPlan: string; // 選擇方案
  startDate: string; // 活動開始日期
  endDate: string; // 活動結束日期
  registrationStatus: RegistrationStatus; // 報名狀態
  bunkLotteryStatus: BunkLotteryStatus; // 抽籤狀態
  registrationTime: string; // 報名時間
  amountDue: number; // 應繳金額
  paymentStatus: PaymentStatus; // 繳費狀態
  hikingExperience?: string; // 登山經歷簡述
}
