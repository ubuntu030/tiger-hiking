export type ACTIVITY_STATUS = '報名登記' | '不可報名' | '活動結束';

export interface IActivity {
  id: number;
  name: string;
  status: ACTIVITY_STATUS;
  date: string;
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