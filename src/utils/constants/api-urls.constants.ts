enum DemoblazeApi {
    BASE_URL = 'https://api.demoblaze.com', //TODO añadir a .env. si .env es vacio tomar este valor
    SIGNUP = '/signup',
    LOGIN = '/login'
}

export const DEMOBLAZE_URLS = {
    SIGNUP: `${DemoblazeApi.BASE_URL}${DemoblazeApi.SIGNUP}`,
    LOGIN: `${DemoblazeApi.BASE_URL}${DemoblazeApi.LOGIN}`,
} as const;




