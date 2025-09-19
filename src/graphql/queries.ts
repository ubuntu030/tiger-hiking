import { gql } from "@apollo/client";

/**
 * 獲取最新活動列表
 */
// 這個查詢會根據傳入的 limit 參數獲取最新的活動
// 後端 GraphQL schema 需要支援排序 (orderBy) 和限制數量 (limit)
export const GET_RECENT_ACTIVITIES = gql`
  query GetRecentActivities($limit: Int!) {
    activities(orderBy: { startDate: DESC }, limit: $limit) {
      id
      name
      startDate
      endDate
      image
      status
      priceA
    }
  }
`;

/**
 * 根據 ID 獲取單一活動的詳細資訊
 */
export const GET_ACTIVITY_BY_ID = gql`
  query GetActivityById($id: Int!) {
    activity(where: { id: $id }) {
      id
      name
      status
      startDate
      endDate
      currentRegistrations #目前報名人數
      maxSlots
      priceA
      priceB
      image
      description
      transport #交通方式說明
      guides {
      leader #領隊名稱
      guide #嚮導名稱
      sweeper #掃隊嚮導名稱
      }
    }
  }
`;

/**
 * 獲取所有活動，支援名稱、狀態、日期篩選
 */
export const GET_ALL_ACTIVITIES = gql`
  # 這裡我們新增 $status 變數，讓你可以同時根據活動名稱和狀態進行查詢
  # 同時新增 $startDate 和 $endDate，用於日期範圍查詢
  # 變數型別可能是 String 或後端定義的 ACTIVITY_STATUS enum
  # 日期格式應為 ISO 8601 字串 (e.g., "2023-10-26T00:00:00.000Z")
  query GetAllActivities(
    $name: String
    $status: String
    $startDate: DateTime
    $endDate: DateTime
  ) {
    # 針對欄位的模糊查詢，常見的作法是使用 "where" 搭配 "contains" 條件。
    # 注意：實際的參數名稱 (例如 where, contains) 取決於你的後端 GraphQL Schema 定義。
    # 你可能需要查閱 API 文件或使用 GraphQL Playground 來確認確切的語法。
    # 當 $name 或 $status 為 null/undefined 時，後端應忽略該過濾條件，
    # 這樣就能實現「非必須」的查詢。
    # 日期查詢使用 gte (大於等於) 和 lte (小於等於) 來篩選出開始日期在指定範圍內的活動。
    activities(
      orderBy: { startDate: DESC }
      where: {
        name: { contains: $name }
        status: { equals: $status }
        startDate: { gte: $startDate }
        endDate: { lte: $endDate }
      }
    ) {
      id
      name
      startDate
      endDate
      image
      status
      priceA
    }
  }
`;

/**
 * 獲取公告列表，支援搜尋和分頁
 */
export const GET_ALL_ANNOUNCEMENT = gql`
  query GetAllAnnouncements($search: String, $limit: Int, $offset: Int) {
    announcements(search: $search, limit: $limit, offset: $offset) {
      nodes {
        id
        title
        content
        date
      }
      totalCount
    }
  }
`;

/**
 * 獲取所有嚮導列表
 */
export const GET_ALL_GUIDES = gql`
  query GetAllGuides {
    guides {
      id
      name
      role
      experience
      image
    }
  }
`;

/**
 * 獲取所有問答
 */
export const GET_FAQ = gql`
  query SearchFaqs($keyword: String) {
    searchFaqs(keyword: $keyword) {
      id
      q
      a
    }
  }
`;

/**
 * 送出聯繫我們資料
 */
export const SEND_CONTACT_MESSAGE = gql`
  mutation SendContactMessage(
    $name: String!
    $email: String!
    $message: String!
  ) {
    sendContactMessage(
      input: { name: $name, email: $email, message: $message }
    ) {
      success
      message
    }
  }
`;

/**
 * 建立一個新的活動報名
 */
export const CREATE_REGISTRATION = gql`
  mutation CreateRegistration(
    $activityId: Int!
    $name: String!
    $idNumber: String!
    $email: String!
    $nationality: String!
    $emergencyContact: String!
    $emergencyPhone: String!
    $address: String!
    $mobile: String!
    $phone: String
  ) {
    createRegistration(
      input: {
        activityId: $activityId
        name: $name
        idNumber: $idNumber
        email: $email
        nationality: $nationality
        emergencyContact: $emergencyContact
        emergencyPhone: $emergencyPhone
        address: $address
        mobile: $mobile
        phone: $phone
      }
    ) {
      success
      message
    }
  }
`;
