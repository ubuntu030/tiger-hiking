import type { ACTIVITY_STATUS } from "./activityStatus";

export interface IActivity {
  id: number;
  name: string;
  status: ACTIVITY_STATUS;
  startDate: string;
  endDate: string;
  plans: { name: string; detail: string; price: number }[];
  image: string;
  description: string;
}
