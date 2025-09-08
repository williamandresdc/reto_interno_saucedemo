import { ApiCredential } from '../interfaces/api-data.interface';

export const DEFAULT_API_PASSWORD = Buffer.from('123456').toString('base64');

export const generateUniqueUser = (): ApiCredential => ({
    user: `retointerno_${Date.now()}`,
    password: DEFAULT_API_PASSWORD
});


export const generateUserWithPrefix = (prefix: string = 'testuser'): ApiCredential => ({
    user: `${prefix}_${Date.now()}`,
    password: DEFAULT_API_PASSWORD
});
