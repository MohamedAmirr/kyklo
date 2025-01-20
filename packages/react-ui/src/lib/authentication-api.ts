import {
  AuthenticationResponse,
  ApiResponse,
  SignInRequest,
  SignUpRequest,
  CreateOtpRequestBody,
  ResetPasswordRequestBody,
  VerifyEmailRequestBody,
} from '@pickup/shared';

import { api } from '@/lib/api';

export const authenticationApi = {
  signIn(request: SignInRequest) {
    return api.post<ApiResponse<AuthenticationResponse>>(
      '/v1/authentication/sign-in',
      request,
    );
  },
  signUp(request: SignUpRequest) {
    return api.post<ApiResponse<AuthenticationResponse>>(
      '/v1/authentication/sign-up',
      request,
    );
  },
  sendOtpEmail(request: CreateOtpRequestBody) {
    return api.post<void>('/v1/otp', request);
  },
  resetPassword(request: ResetPasswordRequestBody) {
    return api.post<void>('/v1/authn/local/reset-password', request);
  },
  verifyEmail(request: VerifyEmailRequestBody) {
    return api.post<void>('/v1/authn/local/verify-email', request);
  },
};
