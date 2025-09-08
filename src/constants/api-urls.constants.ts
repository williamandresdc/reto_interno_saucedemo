const DEMOBLAZE_API = {
    BASE_URL: process.env.DEMOBLAZE_API_BASE_URL || 'https://api.demoblaze.com',
    SIGNUP: '/signup',
    LOGIN: '/login'
} as const;

export const DEMOBLAZE_URLS = {
    SIGNUP: `${DEMOBLAZE_API.BASE_URL}${DEMOBLAZE_API.SIGNUP}`,
    LOGIN: `${DEMOBLAZE_API.BASE_URL}${DEMOBLAZE_API.LOGIN}`,
} as const;




