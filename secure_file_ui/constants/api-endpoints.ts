
const BASE_URL = '/api/';


//#region  Users
const USERS_BASE_URL = `${BASE_URL}users/`;

export function getSignupEndpoint() {
    return `${USERS_BASE_URL}register/`;
}

export function getOTPGenerationEndpoint() {
    return `${USERS_BASE_URL}generate-otp/`;
}

export function getLoginEndpoint() {
    return `${USERS_BASE_URL}login/`;
}

export function getLoggedInUserEndpoint() {
    return `${USERS_BASE_URL}me/`;
}

//#endregion Users