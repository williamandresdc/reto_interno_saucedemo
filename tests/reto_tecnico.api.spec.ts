import { test, expect, APIResponse } from '@playwright/test';
import { DEMOBLAZE_URLS } from '../src/constants/api-urls.constants';
import { DemoblazeErrorMessages, HttpStatus, HEADERS, ApiSuccessMessages, API_VALIDATION_PATTERNS } from '../src/constants/api-messages.constants';
import { API_TEST_USERS, generateUniqueUser } from '../src/constants/api-users.constants';
import { ApiCredential } from '../src/interfaces/api-data.interface';

/**
  Feature: Validación de API REST para Demoblaze
    Como QA Automatizador de pruebas
    Quiero validar las funcionalidades de la API de Demoblaze
    Para asegurar que los endpoints de registro y autenticación funcionan correctamente

  Scenario: Registro exitoso de nuevo usuario
    When envío una petición POST al endpoint de registro con credenciales nuevas y validas
    Then debería recibir un status 200 y un cuerpo de respuesta vacío

  Scenario: Validación de usuario existente
    When intento registrar un usuario ya registrado
    Then debería recibir un mensaje de error notificando que el usuario ya existe

  Scenario: Autenticación con credenciales válidas
    When envío una petición POST al endpoint de login con credenciales válidas
    Then debería recibir un token de autenticación válido

  Scenario: Autenticación con credenciales inválidas
    When envío una petición POST al endpoint de login con credenciales invalidas
    Then debería recibir un mensaje de error
 */

let credentials: ApiCredential;

test.describe.serial('Pruebas API para Demoblaze', () => {
  test.beforeAll(async ({ }, testInfo) => {
    test.skip(testInfo.project.name !== 'api-tests', 'Solo corre en project api-tests');
  })

  test('Validar el registro exitoso de un nuevo usuario', async ({ request }) => {
    let response: APIResponse

    await test.step('When envío una petición POST al endpoint de registro con credenciales nuevas y válidas', async () => {
      credentials = generateUniqueUser();
      response = await request.post(DEMOBLAZE_URLS.SIGNUP, {
        headers: HEADERS.CONTENT_TYPE_JSON,
        data: {
          username: credentials.user,
          password: credentials.password,
        },
      });
    });

    await test.step('Then debería recibir un status 200 y un cuerpo de respuesta vacío', async () => {
      //TODO añadir a conclusiones que no tiene buenas prácticas los status
      expect(response.status()).toBe(HttpStatus.OK);
      const body = await response.json();
      expect(Object.keys(body).length).toBe(0);// La API de demoblaze devuelve un objeto vacío {} para un registro exitoso.
      expect(body).not.toHaveProperty('errorMessage');
      console.log(ApiSuccessMessages.USER_REGISTERED);//TODO cambiar el console.log por log de playwright
    });

  });

  test('Validar que no se permita crear un usuario existente', async ({ request }) => {
    let response: APIResponse;

    await test.step('When intento registrar un usuario ya registrado', async () => {
      response = await request.post(DEMOBLAZE_URLS.SIGNUP, {
        headers: HEADERS.CONTENT_TYPE_JSON,
        data: {
          username: API_TEST_USERS.EXISTING_USER.user,
          password: API_TEST_USERS.EXISTING_USER.password,
        },
      });
    });

    await test.step('Then debería recibir un mensaje de error notificando que el usuario ya existe', async () => {
      expect(response.status()).toBe(HttpStatus.OK);

      const body = await response.json();
      console.log(ApiSuccessMessages.ERROR_EXPECTED);

      expect(body).toHaveProperty('errorMessage');
      expect(body.errorMessage).toBe(DemoblazeErrorMessages.USER_ALREADY_EXISTS);
    });

  });

  test('Validar la autenticación con credenciales válidas', async ({ request }) => {

    let responseLogin: APIResponse;
    await test.step('When envío una petición POST al endpoint de login con credenciales válidas', async () => {

      responseLogin = await request.post(DEMOBLAZE_URLS.LOGIN, {
        headers: HEADERS.CONTENT_TYPE_JSON,
        data: {
          username: credentials?.user ?? API_TEST_USERS.EXISTING_USER.user,
          password: credentials?.password ?? API_TEST_USERS.EXISTING_USER.password
        },
      });
    });

    await test.step('Then debería recibir un token de autenticación válido', async () => {
      expect(responseLogin.status()).toBe(HttpStatus.OK);

      const bodyLogin = await responseLogin.json();

      expect(bodyLogin).not.toBeNull();
      expect(Object.keys(bodyLogin).length).toBeGreaterThan(0);
      expect(bodyLogin).not.toHaveProperty('errorMessage');
      expect(bodyLogin).toMatch(API_VALIDATION_PATTERNS.AUTH_TOKEN_REGEX);
    });

  });

  test('Validar que no se permita la autenticación con credenciales inválidas', async ({ request }) => {
    let response: APIResponse;
    await test.step('When envío una petición POST al endpoint de login con credenciales invalidas', async () => {
      response = await request.post(DEMOBLAZE_URLS.LOGIN, {
        headers: HEADERS.CONTENT_TYPE_JSON,
        data: {
          username: API_TEST_USERS.INVALID_USER.user,
          password: API_TEST_USERS.INVALID_USER.password,
        },
      });
    });

    await test.step('Then debería recibir un mensaje de error', async () => {
      expect(response.status()).toBe(HttpStatus.OK);
      const body = await response.json();
      expect(body).toHaveProperty('errorMessage');
      expect(body.errorMessage).not.toBeNull();
      console.log(ApiSuccessMessages.ERROR_EXPECTED);//TODO cambiar a log de playwright
    });

  });


});