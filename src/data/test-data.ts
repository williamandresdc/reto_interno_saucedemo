import {  LoginCredentials } from '../interfaces/user-data.interface';



export const TEST_USERS: Record<string, LoginCredentials> = {
  STANDARD_USER: {
    username: process.env.STANDARD_USERNAME ?? undefined,
    password: process.env.STANDARD_PASSWORD ?? undefined,
  }
};
