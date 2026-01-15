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
      description
      plans {
        name
        price
        detail
      }
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
      status #活動狀態
      startDate
      endDate
      currentRegistrations #目前報名人數
      maxSlots #活動名額上限
      image
      description
      transport #交通方式說明
      registrationDeadline #報名截止日期
      guides {
        leader #領隊名稱
        guide #嚮導名稱
        sweeper #掃隊嚮導名稱
      }
      plans {
        name
        detail
        price
      }
    }
  }
`;

/**
 * 檢查使用者對於特定活動的報名狀態
 */
export const CHECK_USER_REGISTRATION_STATUS = gql`
  query CheckUserRegistrationStatus($activityId: Int!) {
    checkRegistrationStatus(activityId: $activityId) {
      isRegistered
      status
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
      description
      plans {
        price
      }
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
  query SearchFaqs($keyword: String, $limit: Int, $offset: Int) {
    searchFaqs(keyword: $keyword, limit: $limit, offset: $offset) {
      nodes {
        id
        q
        a
      }
      totalCount
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
 * 獲取當前使用者的所有報名活動
 */
export const GET_MY_REGISTRATIONS = gql`
  query MyRegistrations {
    myRegistrations {
      # Registration details
      id
      plan
      createdAt
      registrationStatus: status
      bunkLotteryStatus
      amountDue
      paymentStatus
      hikingExperience
      # Associated activity details
      activity {
        id
        name
        startDate
        endDate
      }
    }
  }
`;

/**
 * 更新一個已有的活動報名
 */
export const UPDATE_REGISTRATION = gql`
  mutation UpdateRegistration(
    $registrationId: ID!
    $plan: String
    $hikingExperience: String
  ) {
    updateRegistration(
      input: {
        registrationId: $registrationId
        plan: $plan
        hikingExperience: $hikingExperience
      }
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
    $plan: String!
    $name: String!
    $gender: Gender!
    $idNumber: String!
    $email: String!
    $nationality: String!
    $emergencyContact: String!
    $emergencyPhone: String!
    $address: String!
    $mobile: String!
    $phone: String
    $hikingExperience: String
  ) {
    createRegistration(
      input: {
        activityId: $activityId
        plan: $plan
        name: $name
        gender: $gender
        idNumber: $idNumber
        email: $email
        nationality: $nationality
        emergencyContact: $emergencyContact
        emergencyPhone: $emergencyPhone
        address: $address
        mobile: $mobile
        phone: $phone
        hikingExperience: $hikingExperience
      }
    ) {
      success
      message
    }
  }
`;

/**
 * 取消一個活動報名
 */
export const CANCEL_REGISTRATION_MUTATION = gql`
  mutation CancelRegistration($registrationId: ID!) {
    cancelRegistration(registrationId: $registrationId) {
      success
      message
    }
  }
`;

/**
 * 請求/發送 OTP 驗證碼 (Request OTP)
 */
export const REQUEST_OTP = gql`
  mutation RequestOTP($input: RequestOtpInput!) {
    requestOTP(input: $input) {
      success
      message
    }
  }
`;

/**
 * 驗證 OTP 密碼 (Verify OTP)
 */
export const VERIFY_OTP = gql`
  mutation VerifyOtpMutation($input: VerifyOtpInput!) {
    verifyOTP(input: $input) {
      success
      message
      verificationToken
    }
  }
`;
/**
 * 註冊 (Register)
 * 後端 RegisterUserInput 的結構對應前端的 `src/types/auth.model.ts` 中的 `RegisterUserInput` interface。
 * 它包含了 email, password, 和 verificationToken。
 */
export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      success
      message
      user {
        id
        email
      }
    }
  }
`;

/**
 * 登入
 */
export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUserInput!) {
    login(input: $input) {
      success
      message
      adminOtpRequired
      user {
        id
        email
        role
      }
    }
  }
`;

/**
 * Admin Login Step 2: Verify OTP
 */
export const ADMIN_LOGIN_WITH_OTP = gql`
  mutation AdminLoginWithOtp($input: LoginAdminWithOtpInput!) {
    loginAdminWithOtp(input: $input) {
      success
      message
      user {
        id
        email
        role
      }
    }
  }
`;

/**
 * 登出
 */
export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logout {
      success
      message
    }
  }
`;
/**
 * 獲取當前使用者的個人資料用於更新前端登入狀態
 */
export const GET_MY_PROFILE = gql`
  query GetMyProfile {
    me {
      id
      email
      role
    }
  }
`;

/**
 * 請求重設密碼郵件
 */
export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input) {
      success
      message
    }
  }
`;

/**
 * 重設密碼
 */
export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
      message
    }
  }
`;

/**
 * 獲取當前使用者的詳細個人資料
 */
export const GET_MY_PROFILE_DETAIL = gql`
  query GetMyProfileDetail {
    me {
      id
      email
      name
      profile {
        gender
        birthDate
        nationality
        idNumber
        phoneNumber
        emergencyContact
        emergencyContactPhone
        hikingExperience
        address
      }
    }
  }
`;

/**
 * 更新當前使用者的個人資料
 */
export const UPDATE_MY_PROFILE = gql`
  mutation UpdateMyProfile(
    $name: String
    $address: String
    $gender: String
    $birthDate: DateTime
    $nationality: String
    $idNumber: String
    $phoneNumber: String
    $emergencyContact: String
    $emergencyContactPhone: String
    $hikingExperience: String
  ) {
    updateMyProfile(
      input: {
        name: $name
        address: $address
        gender: $gender
        birthDate: $birthDate
        nationality: $nationality
        idNumber: $idNumber
        phoneNumber: $phoneNumber
        emergencyContact: $emergencyContact
        emergencyContactPhone: $emergencyContactPhone
        hikingExperience: $hikingExperience
      }
    ) {
      success
      message
      user {
        id
        email
        name
      }
    }
  }
`;

/**
 * 更改當前登入使用者的密碼
 */
export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(
      input: { currentPassword: $currentPassword, newPassword: $newPassword }
    ) {
      success
      message
    }
  }
`;

/**
 * Admin: Get all announcements
 */
export const ADMIN_GET_ANNOUNCEMENTS = gql`
  query AdminGetAnnouncements($limit: Int, $offset: Int) {
    admin_announcements(limit: $limit, offset: $offset) {
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
 * Admin: Create an announcement
 */
export const ADMIN_CREATE_ANNOUNCEMENT = gql`
  mutation AdminCreateAnnouncement($input: AdminCreateAnnouncementInput!) {
    admin_createAnnouncement(input: $input) {
      id
      title
      content
      date
    }
  }
`;

/**
 * Admin: Update an announcement
 */
export const ADMIN_UPDATE_ANNOUNCEMENT = gql`
  mutation AdminUpdateAnnouncement($input: AdminUpdateAnnouncementInput!) {
    admin_updateAnnouncement(input: $input) {
      id
      title
      content
      date
    }
  }
`;

/**
 * Admin: Delete an announcement
 */
export const ADMIN_DELETE_ANNOUNCEMENT = gql`
  mutation AdminDeleteAnnouncement($id: ID!) {
    admin_removeAnnouncement(id: $id) {
      success
      message
    }
  }
`;