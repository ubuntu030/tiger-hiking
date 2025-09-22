import type { ACTIVITY_STATUS } from "./activityStatus";

export interface Plan {
  name: string;
  detail: string;
  price: number;
}

export interface ActivityDetail {
  id: number;
  name: string;
  status: ACTIVITY_STATUS;
  startDate: string;
  endDate: string;
  currentRegistrations: number;
  maxSlots: number;
  plans: Plan[];
  image: string;
  description: string;
  transport: string;
  guides: {
    leader: string;
    guide: string;
    sweeper: string;
  };
}
