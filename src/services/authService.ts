// ─────────────────────────────────────────────────────
// AUTH SERVICE
// All authentication-related API calls live here.
// ─────────────────────────────────────────────────────

import {apiPost, endPoints} from '@api';
import {ApiResponseType, LoginPayload, LoginResponse} from '@types';
import {getDetailForAPI} from '@common';

// ── API Calls ───────────────────────────────────────

/**
 * Login user with email & password
 */
export const loginService = async (
  payload: LoginPayload,
): Promise<ApiResponseType<LoginResponse>> => {
  const deviceInfo = getDetailForAPI();
  return apiPost<LoginResponse>(endPoints.auth.login, {
    ...payload,
    ...deviceInfo,
  });
};
