
export interface ApiCredential { //TODO mover las interfaces para un archivo aparte
    user: string;
    password: string;
}

const DEFAULT_PASSWORD = Buffer.from('123456').toString('base64');

export const API_TEST_USERS = {
    EXISTING_USER: {
        user: 'retointernoW',
        password: DEFAULT_PASSWORD
    } as ApiCredential,

    INVALID_USER: {
        user: 'usuario_invalido',
        password: 'password_invalida'
    } as ApiCredential,
} as const;


export const generateUniqueUser = (): ApiCredential => ({
    user: `retointerno_${Date.now()}`,
    password: DEFAULT_PASSWORD
});


export const generateUserWithPrefix = (prefix: string = 'testuser'): ApiCredential => ({
    user: `${prefix}_${Date.now()}`,
    password: DEFAULT_PASSWORD
});
