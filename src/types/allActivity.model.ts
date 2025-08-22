import type { ACTIVITY_STATUS } from "./activityStatus";

export interface ActivityDetail {
  id: number;
  name: string;
  status: ACTIVITY_STATUS;
  startDate: string;
  endDate: string;
  currentRegistrations: number;
  maxSlots: number;
  priceA: number;
  priceB: number;
  image: string;
  description: string;
  transport: string;
  guides: {
    leader: string;
    guide: string;
    sweeper: string;
  };
}
