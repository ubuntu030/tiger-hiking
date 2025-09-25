import type { ActivityDetail } from "../types/allActivity.model";
import type { Guide } from "../types/guide.model";
import type { MyActivity } from "../types/my-activity.model";
import type { SlideshowSlide } from "../types/slideshow.model";

export const mockData: MockData = {
  // 首頁幻燈片資料
  slideshow: [
    {
      img: "https://images.unsplash.com/photo-1655586201147-dbcf6b0613d0?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "探索台灣山林之美",
      subtitle: "從入門百岳到進階縱走，我們帶您安全地體驗每一段壯遊。",
    },
    {
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "挑戰自我極限",
      subtitle: "專業嚮導帶領，挑戰台灣高山的壯麗與嚴峻。",
    },
    {
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "享受靜謐片刻",
      subtitle: "在山林中尋找寧靜，感受大自然的療癒力量。",
    },
  ],
  // 活動資料
  activities: [
    {
      id: 1,
      name: "玉山主峰單攻",
      status: "報名登記",
      startDate: "2025-08-15",
      endDate: "2025-08-16",
      currentRegistrations: 5,
      maxSlots: 10,
      plans: [
        { name: "A方案", detail: "含嚮導、交通、餐食與保險", price: 3500 },
        { name: "B方案", detail: "全程自理 (僅含嚮導與保險)", price: 2800 },
      ],
      image: "https://placehold.co/600x400/6b7280/FFFFFF?text=玉山",
      description:
        "台灣第一高峰，是登山者的夢想殿堂。本次活動為單日攻頂，考驗體力與意志力，適合有經驗的登山者。",
      transport: "提供嘉義高鐵站至塔塔加登山口來回接駁。",
      guides: { leader: "陳翰霖", guide: "王曉明", sweeper: "李美玲" },
    },
    {
      id: 2,
      name: "雪山東峰單日健行",
      status: "報名登記",
      startDate: "2025-08-22",
      endDate: "2025-08-23",
      currentRegistrations: 8,
      maxSlots: 15,
      plans: [
        { name: "A方案", detail: "含嚮導、交通、餐食與保險", price: 2200 },
        { name: "B方案", detail: "全程自理 (僅含嚮導與保險)", price: 1600 },
      ],
      image: "https://placehold.co/600x400/78716c/FFFFFF?text=雪山東峰",
      description:
        "雪山入門路線，風景秀麗，可欣賞黑森林與圈谷的壯闊景致。適合初學者體驗高山之美。",
      transport: "提供宜蘭火車站至武陵農場來回接駁。",
      guides: { leader: "林俊傑", guide: "張雅婷", sweeper: "黃小虎" },
    },
    {
      id: 3,
      name: "嘉明湖三天兩夜",
      status: "不可報名",
      startDate: "2025-09-05",
      endDate: "2025-09-06",
      currentRegistrations: 12,
      maxSlots: 12,
      plans: [
        { name: "A方案", detail: "含嚮導、交通、餐食與保險", price: 7800 },
        { name: "B方案", detail: "全程自理 (僅含嚮導與保險)", price: 6500 },
      ],
      image: "https://placehold.co/600x400/57534e/FFFFFF?text=嘉明湖",
      description:
        "探訪天使的眼淚，高山湖泊的湛藍讓人心醉。此行程需背負重裝，並入住山屋。",
      transport: "提供池上火車站至向陽森林遊樂區來回接駁。",
      guides: { leader: "陳翰霖", guide: "趙四方", sweeper: "周曉涵" },
    },
    {
      id: 4,
      name: "合歡山北峰日出團",
      status: "報名登記",
      startDate: "2025-09-12",
      endDate: "2025-09-13",
      currentRegistrations: 3,
      maxSlots: 20,
      plans: [
        { name: "A方案", detail: "含嚮導、交通、餐食與保險", price: 1800 },
        { name: "B方案", detail: "全程自理 (僅含嚮導與保險)", price: 1200 },
      ],
      image: "https://placehold.co/600x400/a8a29e/FFFFFF?text=合歡山",
      description:
        "最親民的百岳之一，欣賞壯麗的日出雲海。路線平緩，適合全家大小一同參與。",
      transport: "提供台中高鐵站至清境、武嶺來回接駁。",
      guides: { leader: "林俊傑", guide: "李美玲", sweeper: "吳宗憲" },
    },
    {
      id: 5,
      name: "奇萊南華二日行",
      status: "活動結束",
      startDate: "2025-07-20",
      endDate: "2025-07-21",
      currentRegistrations: 10,
      maxSlots: 10,
      plans: [
        { name: "A方案", detail: "含嚮導、交通、餐食與保險", price: 5500 },
        { name: "B方案", detail: "全程自理 (僅含嚮導與保險)", price: 4800 },
      ],
      image: "https://placehold.co/600x400/d6d3d1/FFFFFF?text=奇萊南華",
      description:
        "黃金大草原的壯闊景觀，是奇萊南華最吸引人的地方。夜晚可在無光害的環境下觀星。",
      transport: "提供埔里客運站至屯原登山口來回接駁。",
      guides: { leader: "陳翰霖", guide: "王曉明", sweeper: "黃小虎" },
    },
    {
      id: 6,
      name: "陽明山東西大縱走",
      status: "報名登記",
      startDate: "2025-09-20",
      endDate: "2025-09-21",
      currentRegistrations: 1,
      maxSlots: 25,
      plans: [
        { name: "A方案", detail: "含嚮導、交通、餐食與保險", price: 900 },
        { name: "B方案", detail: "全程自理 (僅含嚮導與保險)", price: 500 },
      ],
      image: "https://placehold.co/600x400/b7a99b/FFFFFF?text=陽明山",
      description:
        "挑戰台北市的經典縱走路線，全程約24公里，考驗耐力。可自行前往風櫃嘴登山口集合。",
      transport: "無接駁服務，請自行前往集合地點。",
      guides: { leader: "張雅婷", guide: "吳宗憲", sweeper: "趙四方" },
    },
    {
      id: 7,
      name: "北大武山三天兩夜",
      status: "不可報名",
      startDate: "2025-10-10",
      endDate: "2025-10-11",
      currentRegistrations: 8,
      maxSlots: 8,
      plans: [
        { name: "A方案", detail: "含嚮導、交通、餐食與保險", price: 8200 },
        { name: "B方案", detail: "全程自理 (僅含嚮導與保險)", price: 7000 },
      ],
      image: "https://placehold.co/600x400/8c7e6e/FFFFFF?text=北大武山",
      description:
        "南台灣的聖山，以雲海、鐵杉、杜鵑聞名。路途遙遠，是體力與毅力的一大挑戰。",
      transport: "提供屏東火車站至泰武登山口來回接駁。",
      guides: { leader: "陳翰霖", guide: "周曉涵", sweeper: "李美玲" },
    },
  ],
  // 公告資料
  announcements: [
    {
      id: 1,
      title: "【重要】颱風季節登山安全注意事項",
      date: "2025-07-25",
      content:
        "近期進入颱風季節，山區天氣變化劇烈，請所有隊員務必確認裝備齊全，並隨時注意天氣預報。若遇天候不佳，本團隊有權延期或取消活動，以策安全。",
    },
    {
      id: 2,
      title: "【公告】網站會員系統即將上線",
      date: "2025-07-20",
      content:
        "為提供更優質的服務，我們正在開發全新的會員系統。未來您將可以更方便地管理報名紀錄與個人資料，敬請期待！",
    },
    {
      id: 3,
      title: "【分享】高山症預防與應對小知識",
      date: "2025-07-15",
      content:
        "前往高海拔地區，您需要了解高山症的預防方法。建議出發前保持充足睡眠、多喝水，並可諮詢醫師建議使用預防藥物。",
    },
  ],
  // 關於我們 - 嚮導資料
  guides: [
    {
      id: 1,
      name: "陳翰霖",
      role: "創辦人 / 高山嚮導",
      experience:
        "擁有超過15年高山嚮導經驗，完登台灣百岳。持有 EMT-1 緊急救護技術員證照，專長為高海拔風險評估與緊急應變。",
      image: "https://placehold.co/300x300/57534e/FFFFFF?text=陳翰霖",
    },
    {
      id: 2,
      name: "林俊傑",
      role: "高山嚮導",
      experience:
        "新生代全能嚮導，熱愛攝影與山林紀錄。持有 WFR 野外急救員證照，擅長帶領隊員發掘山林中的秘境與故事。",
      image: "https://placehold.co/300x300/78716c/FFFFFF?text=林俊傑",
    },
    {
      id: 3,
      name: "張雅婷",
      role: "登山領隊 / 戶外瑜珈老師",
      experience:
        "結合登山與瑜珈，推廣身心靈平衡的戶外體驗。持有美國瑜珈聯盟認證師資，帶領您在山林間感受呼吸與寧靜。",
      image: "https://placehold.co/300x300/a8a29e/FFFFFF?text=張雅婷",
    },
  ],
  // 常見問題資料
  faqs: [
    {
      q: "如果報名後，因故無法參加，可以退費嗎？",
      a: "活動出發前 14 日前取消，可全額退款。出發前 7-13 日取消，退款 50%。出發前 7 日內取消，恕不退款。但可將名額轉讓給他人。詳細規範請參考報名條款。",
    },
    {
      q: "我沒有登山經驗，可以報名嗎？",
      a: "我們有針對不同難度設計的路線，從入門的郊山健行到進階的高山縱走都有。建議您參考活動詳情頁的「體能要求」與「路線分級」，選擇適合自己的行程。",
    },
    {
      q: "活動費用包含哪些項目？",
      a: "A方案通常包含嚮導費、交通接駁、住宿、餐食與保險。B方案則可能不包含交通或餐食，適合可自行前往者。詳細包含項目請見各活動的費用說明。",
    },
    {
      q: "需要自己準備哪些裝備？",
      a: "我們會在行前通知中提供詳細的裝備清單。基本裝備如登山背包、登山鞋、雨衣雨褲、頭燈等需要自備。部分裝備如睡袋、登山杖我們也提供租借服務。",
    },
  ],
  // 活動相簿資料
  albums: [
    {
      id: 1,
      title: "2025-07 奇萊南華",
      image: "https://placehold.co/600x400/d6d3d1/FFFFFF?text=奇萊南華回憶",
    },
    {
      id: 2,
      title: "2025-06 嘉明湖",
      image: "https://placehold.co/600x400/57534e/FFFFFF?text=嘉明湖回憶",
    },
    {
      id: 3,
      title: "2025-05 雪山東峰",
      image: "https://placehold.co/600x400/78716c/FFFFFF?text=雪山回憶",
    },
    {
      id: 4,
      title: "2025-04 玉山主峰",
      image: "https://placehold.co/600x400/6b7280/FFFFFF?text=玉山回憶",
    },
  ],
  myActivities: [
    {
      id: "1",
      activityId: "101",
      name: "玉山主峰單攻",
      selectedPlan: "A方案",
      startDate: "2025-08-15",
      endDate: "2025-08-16",
      registrationStatus: "已核准",
      bunkLotteryStatus: "已抽中",
      registrationTime: "2025-07-01T10:00:00Z",
      amountDue: 3500,
      paymentStatus: "已收到款項",
      hikingExperience: "曾完成雪山東峰與合歡山北峰。",
    },
    {
      id: "2",
      activityId: "102",
      name: "雪山東峰單日健行",
      selectedPlan: "B方案",
      startDate: "2025-08-22",
      endDate: "2025-08-23",
      registrationStatus: "未核准",
      bunkLotteryStatus: "尚未抽籤",
      registrationTime: "2025-07-05T14:30:00Z",
      amountDue: 1600,
      paymentStatus: "未繳費",
      hikingExperience: "無登山經驗。",
    },
    {
      id: "3",
      activityId: "103",
      name: "嘉明湖三天兩夜",
      selectedPlan: "A方案",
      startDate: "2025-09-05",
      endDate: "2025-09-06",
      registrationStatus: "已核准",
      bunkLotteryStatus: "候補中",
      registrationTime: "2025-07-10T09:15:00Z",
      amountDue: 7800,
      paymentStatus: "未繳費",
      hikingExperience: "完成多次百岳縱走。",
    },
    {
      id: "4",
      activityId: "104",
      name: "合歡山北峰日出團",
      selectedPlan: "B方案",
      startDate: "2025-09-12",
      endDate: "2025-09-13",
      registrationStatus: "已核准",
      bunkLotteryStatus: "已抽中",
      registrationTime: "2025-07-12T16:45:00Z",
      amountDue: 1200,
      paymentStatus: "已收到款項",
      hikingExperience: "參加過多次郊山健行。",
    },
    {
      id: "5",
      activityId: "105",
      name: "奇萊南華二日行",
      selectedPlan: "A方案",
      startDate: "2025-07-20",
      endDate: "2025-07-21",
      registrationStatus: "已取消",
      bunkLotteryStatus: "未抽中",
      registrationTime: "2025-06-25T11:00:00Z",
      amountDue: 5500,
      paymentStatus: "已退款",
      hikingExperience: "完成玉山主峰單攻。",
    },
    {
      id: "6",
      activityId: "106",
      name: "陽明山東西大縱走",
      selectedPlan: "B方案",
      startDate: "2025-09-20",
      endDate: "2025-09-21",
      registrationStatus: "已核准",
      bunkLotteryStatus: "尚未抽籤",
      registrationTime: "2025-07-15T08:20:00Z",
      amountDue: 500,
      paymentStatus: "未繳費",
      hikingExperience: "無登山經驗。",
    },
    {
      id: "7",
      activityId: "107",
      name: "北大武山三天兩夜",
      selectedPlan: "A方案",
      startDate: "2025-10-10",
      endDate: "2025-10-11",
      registrationStatus: "已核准",
      bunkLotteryStatus: "候補中",
      registrationTime: "2025-07-18T13:50:00Z",
      amountDue: 8200,
      paymentStatus: "未繳費",
      hikingExperience: "完成嘉明湖與雪山主峰。",
    },
    {
      id: "8",
      activityId: "108",
      name: "玉山群峰縱走",
      selectedPlan: "A方案",
      startDate: "2025-11-01",
      endDate: "2025-11-05",
      registrationStatus: "已核准",
      bunkLotteryStatus: "已抽中",
      registrationTime: "2025-07-20T10:10:00Z",
      amountDue: 15000,
      paymentStatus: "已收到款項",
      hikingExperience: "完成多次百岳縱走。",
    },
    {
      id: "9",
      activityId: "109",
      name: "雪山主峰單攻",
      selectedPlan: "B方案",
      startDate: "2025-12-10",
      endDate: "2025-12-11",
      registrationStatus: "已核准",
      bunkLotteryStatus: "未抽中",
      registrationTime: "2025-07-22T15:30:00Z",
      amountDue: 2800,
      paymentStatus: "未繳費",
      hikingExperience: "無登山經驗。",
    },
    {
      id: "10",
      activityId: "110",
      name: "合歡東峰日出團",
      selectedPlan: "A方案",
      startDate: "2025-12-20",
      endDate: "2025-12-21",
      registrationStatus: "已核准",
      bunkLotteryStatus: "尚未抽籤",
      registrationTime: "2025-07-25T09:00:00Z",
      amountDue: 1800,
      paymentStatus: "已收到款項",
      hikingExperience: "參加過多次郊山健行。",
    },
  ],
};

export interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Album {
  id: number;
  title: string;
  image: string;
}

export interface MockData {
  activities: ActivityDetail[];
  announcements: Announcement[];
  guides: Guide[];
  faqs: FAQ[];
  albums: Album[];
  slideshow: SlideshowSlide[];
  myActivities: MyActivity[];
}
