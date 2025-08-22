import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { toast } from "react-toastify"; // 假設使用 react-toastify 作為通知元件

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
});

// 這是錯誤處理的核心
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    // 處理 GraphQL Errors (errors 陣列)
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // 在開發者控制台印出詳細錯誤
        console.error(
          `[GraphQL error]: Message: ${err.message}, Location: ${JSON.stringify(
            err.locations
          )}, Path: ${err.path}`
        );

        // 根據後端回傳的 extensions.code 執行不同操作
        switch (err.extensions?.code) {
          case "UNAUTHENTICATED":
            // 可能是 token 過期
            toast.error("您的登入已過期，請重新登入。");
            // 執行登出邏輯，例如清除 local storage 並跳轉
            // logoutUser();
            // router.push('/login');
            break;

          case "FORBIDDEN":
            toast.warn("您沒有權限執行此操作。");
            break;

          // 你可以定義更多自訂的錯誤碼
          default:
            // 對於其他未知的 GraphQL 錯誤，顯示一個通用的錯誤訊息
            toast.error(`發生錯誤：${err.message}`);
        }
      }
    }

    // 處理網路錯誤
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
      toast.error("網路連線失敗，請檢查您的網路並稍後再試。");
    }
  }
);

// 使用 from 將 httpLink 和 errorLink 串聯起來
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
