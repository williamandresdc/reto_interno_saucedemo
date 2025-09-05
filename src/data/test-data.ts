import { UserCheckoutData, LoginCredentials } from '../interfaces/user-data.interface';
import { faker } from '@faker-js/faker';


export const TEST_USERS: Record<string, LoginCredentials> = {
  STANDARD_USER: {
    username: process.env.STANDARD_USERNAME ?? undefined,
    password: process.env.STANDARD_PASSWORD ?? undefined,
  }
};

export const TEST_CHECKOUT_DATA: Record<string, UserCheckoutData> = {
  CARLOS: {
    firstName: 'Carlos',
    lastName: 'Rodriguez',
    postalCode: '12345'
  },
  ANA: {
    firstName: 'Ana',
    lastName: 'Martinez',
    postalCode: '67890'
  },
  RANDOM:{
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode()
  }
};