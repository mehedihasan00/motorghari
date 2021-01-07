import { post } from '.';

export async function signupWithPhone (phoneNumber) {
  return post(`users/auth/signup`, {phoneNumber});
}

export async function verification ({phoneNumber, token}) {
  return post(`users/auth/verification`, {phoneNumber, token});
}

export async function signup ({phoneNumber, password}) {
  return post(`users/auth/confirm`, {phoneNumber, password});
}

export async function login ({phoneNumber, password}) {
  return post(`users/auth/login`, {phoneNumber, password});
}

export async function resend ({phoneNumber}) {
  return post(`users/auth/resend`, {phoneNumber});
}

export async function resetPass (phone) {
  return post(`users/auth/reset`, {phoneNumber: phone});
}
export async function signupWithPassword (phone) {
  return post(`users/auth/signup/store`, {phoneNumber: phone});
}

export async function changePass ({id, password}) {
  return post(`users/auth/change`, {userId: id, password});
}