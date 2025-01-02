const ROUTES = {
    HOMEPAGE: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    SIGNUP_SUCCESS: '/signup/success',
    DASHBOARD: '/dashboard',
    FILE: '/file'
}

export const PUBLIC_ROUTES = [ROUTES.HOMEPAGE, ROUTES.LOGIN, ROUTES.SIGNUP, ROUTES.SIGNUP_SUCCESS, ROUTES.FILE];
export const AUTH_USER_RESTRICTED_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP, ROUTES.SIGNUP_SUCCESS];

export default ROUTES;