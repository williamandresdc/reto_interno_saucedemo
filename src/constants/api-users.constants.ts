
import { ApiCredential } from '../interfaces/api-data.interface';
import { DEFAULT_API_PASSWORD } from '../utils/user-generator.util';


export const API_TEST_USERS = {
    EXISTING_USER: {
        user: 'retointernoW',
        password: DEFAULT_API_PASSWORD
    } as ApiCredential,

    INVALID_USER: {
        user: 'usuario_invalido',
        password: 'password_invalida'
    } as ApiCredential,
} as const;
