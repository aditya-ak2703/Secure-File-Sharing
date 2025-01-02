import { ftruncate } from "fs";

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

export function getLogOutEndpoint() {
    return `${USERS_BASE_URL}logout/`
}

export function getLoggedInUserEndpoint() {
    return `${USERS_BASE_URL}me/`;
}

//#endregion Users

//#region  Files

const FILE_BASE_URL = `${BASE_URL}files/`;

export function getFileCreateEndpoint() {
    return `${FILE_BASE_URL}file/`
}

export function getFileListEndpoint() {
    return `${FILE_BASE_URL}files/`
}

export function getSharableFileCreateEndpoint() {
    return `${FILE_BASE_URL}sharable-file/`;     
} 

export function getViewSharedFileEndpoint(uuid: string) {
    return `${FILE_BASE_URL}view-shared-file/?uuid=${uuid}`;
}

//#endregion