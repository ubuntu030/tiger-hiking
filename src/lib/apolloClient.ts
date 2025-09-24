import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { eventBus } from "./eventBus";

const httpLink = new HttpLink({
  // TODO: 使用環境變數管理
  uri: import.meta.env.VITE_GRAPHQL_API_URL || "http://localhost:3000/graphql",
});

// 這是錯誤處理的核心
const errorLink = onError(({ graphQLErrors, networkError }) => {
  let errorMessage = "發生未知的錯誤，請稍後再試。";
  let errorType: "error" | "warn" = "error";

  if (graphQLErrors) {
    console.error(`[GraphQL error]:`, graphQLErrors);
    const firstError = graphQLErrors[0];
    errorMessage = firstError.message;

    switch (firstError.extensions?.code) {
      case "UNAUTHENTICATED":
        errorMessage = "您的登入已過期，請重新登入。";
        // 在此處可以加入登出邏輯
        break;
      case "FORBIDDEN":
        errorMessage = "您沒有權限執行此操作。";
        errorType = "warn";
        break;
    }
  }

  if (networkError) {
    console.error(`[Network error]:`, networkError);
    errorMessage = "網路連線失敗，請檢查您的網路並稍後再試。";
  }

  eventBus.emit("SHOW_TOAST", { message: errorMessage, type: errorType });
});

// 使用 from 將 httpLink 和 errorLink 串聯起來
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
