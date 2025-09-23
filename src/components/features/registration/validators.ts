/**
 * 驗證台灣身分證號碼格式與校驗碼
 * @param id - 身分證號碼字串
 * @returns boolean - 是否為有效身分證號碼
 */
export const isValidTaiwanId = (id: string): boolean => {
  // 格式檢查：1個英文字母 + 1或2 + 8個數字
  if (!/^[A-Z][12]\d{8}$/.test(id)) {
    return false;
  }

  const letterValues: { [key: string]: number } = {
    A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17, I: 34, J: 18, K: 19, L: 20, M: 21,
    N: 22, O: 35, P: 23, Q: 24, R: 25, S: 26, T: 27, U: 28, V: 29, W: 32, X: 30, Y: 31, Z: 33,
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