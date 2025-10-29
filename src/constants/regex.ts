export const REGEX_EMAIL = /^\S+@\S+\.\S+$/; // 電子郵件格式
export const REGEX_PHONE = /^\d+$/; // 僅允許數字的電話號碼
export const REGEX_TAIWAN_ID = /^[A-Z][12]\d{8}$/; // 台灣身份證格式
export const REGEX_PASSPORT = /^[A-Z0-9]+$/; // 護照格式
export const REGEX_PASSWORD = /^(?=.*[A-Za-z]).{8,}$/; // 密碼長度至少8個字元，且必須包含至少一個英文字母
