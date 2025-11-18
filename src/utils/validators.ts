import {
  REGEX_EMAIL,
  REGEX_PHONE,
  REGEX_TAIWAN_ID,
  REGEX_PASSPORT,
  REGEX_PASSWORD,
} from "../constants/regex";

// 驗證電子郵件
export const isValidEmail = (email: string): boolean => REGEX_EMAIL.test(email);

// 驗證電話號碼
export const isValidPhone = (phone: string): boolean => REGEX_PHONE.test(phone);

// 驗證台灣身份證
export const isValidTaiwanId = (id: string): boolean => {
  if (!REGEX_TAIWAN_ID.test(id)) {
    return false;
  }

  const letterValues: { [key: string]: number } = {
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    G: 16,
    H: 17,
    I: 34,
    J: 18,
    K: 19,
    L: 20,
    M: 21,
    N: 22,
    O: 35,
    P: 23,
    Q: 24,
    R: 25,
    S: 26,
    T: 27,
    U: 28,
    V: 29,
    W: 32,
    X: 30,
    Y: 31,
    Z: 33,
  };

  const firstLetter = id.charAt(0).toUpperCase();
  const letterValue = letterValues[firstLetter];

  if (letterValue === undefined) {
    return false;
  }

  const d1 = Math.floor(letterValue / 10);
  const d2 = letterValue % 10;

  let sum = d1 + d2 * 9;

  for (let i = 1; i < 9; i++) {
    sum += parseInt(id.charAt(i), 10) * (9 - i);
  }
  sum += parseInt(id.charAt(9), 10);

  return sum % 10 === 0;
};

// 驗證護照
export const isValidPassport = (passport: string): boolean =>
  REGEX_PASSPORT.test(passport);

// 驗證密碼
export const isValidPassword = (password: string): boolean =>
  REGEX_PASSWORD.test(password);
