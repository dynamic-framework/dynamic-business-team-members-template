import type { GenericAbortSignal } from 'axios';

import liquidParser from '../../utils/liquid-parser';
import { ApiUserStatus } from '../api-interface';
import ApiClient from '../clients/apiClient';

import userStatusMock from './mocks/userStatus.json';

export async function list(
  status?: ApiUserStatus['status'],
  config?: { abortSignal: GenericAbortSignal },
) {
  if (liquidParser.parse('{{vars.mock-team-members}}') === 'true') {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(0);
      }, 1000);
    });
    return userStatusMock as Array<ApiUserStatus>;
  }

  const { data } = await ApiClient.request<Array<ApiUserStatus>>({
    url: '/user-status',
    method: 'GET',
    signal: config?.abortSignal,
    params: {
      status,
    },
  });

  return data;
}
