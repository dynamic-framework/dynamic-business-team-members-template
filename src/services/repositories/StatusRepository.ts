import type { GenericAbortSignal } from 'axios';

import { ApiUserStatus } from '../api-interface';
import ApiClient from '../clients/apiClient';

export async function list(
  status?: ApiUserStatus['status'],
  config?: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<Array<ApiUserStatus>>({
    url: '/status-list',
    method: 'GET',
    signal: config?.abortSignal,
    params: {
      status,
    },
  });

  return data;
}
