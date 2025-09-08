import { test, expect } from '@playwright/test';
import { DEMOBLAZE_URLS } from '../src/utils/constants/api-urls.constants';
import { DemoblazeErrorMessages, HttpStatus, HEADERS, ApiSuccessMessages } from '../src/utils/constants/api-messages.constants';
import { ApiCredential, API_TEST_USERS, generateUniqueUser } from '../src/utils/constants/api-users.constants';

let credentials: ApiCredential;

test.describe.serial('Pruebas API para Demoblaze', () => {
  test.beforeAll(async ({ }, testInfo) => {
    test.skip(testInfo.project.name !== 'api-tests', 'Solo corre en project api-tests');
  })

  test('Validar el registro exitoso de un nuevo usuario', async ({ request }) => {
    credentials = generateUniqueUser();

    const response = await request.post(DEMOBLAZE_URLS.SIGNUP, {
      headers: HEADERS.CONTENT_TYPE_JSON,
      data: {
        username: credentials.user,
        password: credentials.password,
      },
    });

    //TODO añadir a conclusiones que no tiene buenas prácticas los status
    expect(response.status()).toBe(HttpStatus.OK);
    const body = await response.json();
    expect(Object.keys(body).length).toBe(0);// La API de demoblaze devuelve un objeto vacío {} para un registro exitoso.
    expect(body).not.toHaveProperty('errorMessage');
    console.log(ApiSuccessMessages.USER_REGISTERED);//TODO cambiar el console.log por log de playwright
  });

  test('Validar que no se permita crear un usuario existente', async ({ request }) => {
    const existingUser = API_TEST_USERS.EXISTING_USER;

    const response = await request.post(DEMOBLAZE_URLS.SIGNUP, {
      headers: HEADERS.CONTENT_TYPE_JSON,
      data: {
        username: existingUser.user,
        password: existingUser.password,
      },
    });

    expect(response.status()).toBe(HttpStatus.OK);

    const body = await response.json();
    console.log(ApiSuccessMessages.ERROR_EXPECTED);

    expect(body).toHaveProperty('errorMessage');
    expect(body.errorMessage).toBe(DemoblazeErrorMessages.USER_ALREADY_EXISTS);
  });

  test('Validar la autenticación con credenciales válidas', async ({ request }) => {


    const responseLogin = await request.post(DEMOBLAZE_URLS.LOGIN, {
      headers: HEADERS.CONTENT_TYPE_JSON,
      data: {
        username: credentials?.user ?? API_TEST_USERS.EXISTING_USER.user,
        password: credentials?.password ?? API_TEST_USERS.EXISTING_USER.password
      },
    });


    expect(responseLogin.status()).toBe(HttpStatus.OK);

  
    const bodyLogin = await responseLogin.json();


    expect(bodyLogin).not.toBeNull();
    expect(Object.keys(bodyLogin).length).toBeGreaterThan(0);
    expect(bodyLogin).not.toHaveProperty('errorMessage');
    expect(bodyLogin).toMatch(/^Auth_token:\s+[A-Za-z0-9+/=]+$/) //TODO PASAR A CONSTANTES
  });

  test('Validar que no se permita la autenticación con credenciales inválidas', async ({ request }) => {
    const invalidUser = API_TEST_USERS.INVALID_USER;

    const response = await request.post(DEMOBLAZE_URLS.LOGIN, {
      headers: HEADERS.CONTENT_TYPE_JSON,
      data: {
        username: invalidUser.user,
        password: invalidUser.password,
      },
    });

    expect(response.status()).toBe(HttpStatus.OK);

    const body = await response.json();


    expect(body).toHaveProperty('errorMessage');
    expect(body.errorMessage).not.toBeNull();
    console.log(ApiSuccessMessages.ERROR_EXPECTED);//TODO cambiar a log de playwright
  });


});