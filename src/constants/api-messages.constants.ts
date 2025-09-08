
export enum DemoblazeErrorMessages {
  USER_ALREADY_EXISTS = 'This user already exist.'
//   ,INVALID_CREDENTIALS = 'User does not exist.'
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export const HEADERS = {
  CONTENT_TYPE_JSON: {
    'Content-Type': 'application/json'
  }
} as const;


export enum ApiSuccessMessages {
  USER_REGISTERED = '✓ Usuario registrado exitosamente',
  ERROR_EXPECTED = '✓ Error esperado validado correctamente'
}