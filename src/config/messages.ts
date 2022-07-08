export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const RETRIEVE_ACCOUNT = 'RETRIEVE_ACCOUNT';
export const CHECK_PASSWORD = 'CHECK_PASSWORD';

export type RuntimeMessage = {
  msg: string,
  payload: object
}