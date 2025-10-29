/**
 * @description 後端 GraphQL `RegisterUserInput` 型別的對應前端型別
 */
export interface RegisterUserInput {
  email: string;
  password:string;
  verificationToken: string;
}