export interface DefaultResponse {
  error: boolean;
  message: string;
}

export interface LoginRequestPayload {
  email: string;
  password: string;
}
