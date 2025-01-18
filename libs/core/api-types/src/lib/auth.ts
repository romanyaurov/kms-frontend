export interface DefaultResponse {
  error: boolean;
  message: string;
}

export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface RegisterRequestPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  post?: string;
  skills?: string[];
}