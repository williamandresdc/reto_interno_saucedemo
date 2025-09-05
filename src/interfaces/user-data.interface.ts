import { Locator } from "@playwright/test";

export interface UserCheckoutData {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export interface ProductInfo {
  name: string | undefined;
  price: string | undefined;
  addToCartButton: Locator
}

export interface LoginCredentials {
  username: string | undefined;
  password: string | undefined;
}
