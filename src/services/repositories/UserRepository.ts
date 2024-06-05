import type { GenericAbortSignal } from 'axios';

import {
  ApiUser,
  ApiUserPermissions,
  ApiUserRequest,
  ApiUserUpdate,
} from '../api-interface';
import ApiClient from '../clients/apiClient';
import userItemMapper from '../mappers/userItemMapper';
import userMapper from '../mappers/userMapper';
import userPermissionsMapper from '../mappers/userPermissionsMapper';

export async function list(
  per_page: number,
  page: number,
  config?: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<Array<ApiUser>>({
    url: '/users',
    method: 'GET',
    signal: config?.abortSignal,
    params: {
      per_page,
      page,
    },
  });

  return data.map((item) => userItemMapper(item));
}

export async function get(
  username: string,
  config?: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<ApiUser>({
    url: `/users/${username}`,
    method: 'GET',
    signal: config?.abortSignal,
  });

  return userMapper(data);
}

export async function create(
  user: ApiUserRequest,
  config?: { abortSignal: GenericAbortSignal },
) {
  await ApiClient.request<ApiUser>({
    url: '/user',
    method: 'POST',
    signal: config?.abortSignal,
    data: user,
  });
}

export async function update(
  username: string,
  user: ApiUserUpdate,
  config?: { abortSignal: GenericAbortSignal },
) {
  await ApiClient.request({
    url: `/users/${username}`,
    method: 'PUT',
    signal: config?.abortSignal,
    data: user,
  });
}

export async function changeRole(
  username: string,
  role: string,
  config?: { abortSignal: GenericAbortSignal },
) {
  await ApiClient.request({
    url: `/users/${username}/role`,
    method: 'PUT',
    signal: config?.abortSignal,
    data: {
      role,
    },
  });
}

export async function changeStatus(
  username: string,
  status: string,
  config?: { abortSignal: GenericAbortSignal },
) {
  await ApiClient.request({
    url: `/users/${username}/status`,
    method: 'PUT',
    signal: config?.abortSignal,
    data: {
      status,
    },
  });
}

export async function permissions(
  params?: {
    config?: {
      abortSignal: GenericAbortSignal,
    },
  },
) {
  const ROLE_AS = {
    admin: 'ADMIN_PERMISSIONS',
    authorizer: 'AUTHORIZER_PERMISSIONS',
    operator: 'OPERATOR_PERMISSIONS',
  };

  const { data } = await ApiClient.request<ApiUserPermissions>({
    url: '/user-permissions',
    method: 'GET',
    signal: params?.config?.abortSignal,
    // These headers are for obtaining different permissions from the stoplight examples.
    headers: {
      Prefer: `code=200, example=${ROLE_AS.admin}`,
    },
  });

  return userPermissionsMapper(data);
}
