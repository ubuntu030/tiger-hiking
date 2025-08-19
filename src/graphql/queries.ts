import { gql } from "@apollo/client";

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
      currentRegistrations
      maxSlots
    }
  }
`;

