import type { ACTIVITY_STATUS } from "./activityStatus";

export interface ActivityCard {
  id: number;
  name: string;
  status: ACTIVITY_STATUS;
  startDate: string;  
  endDate: string;
  priceA: number;
  image: string;
}
