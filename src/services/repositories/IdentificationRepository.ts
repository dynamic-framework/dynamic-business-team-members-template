import type { GenericAbortSignal } from 'axios';

import { ApiUserCountry } from '../api-interface';
import ApiClient from '../clients/apiClient';
import { UserIdentificationType } from '../interface';

export async function list(
  country: ApiUserCountry['country'],
  config?: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<Array<UserIdentificationType>>({
    url: '/identification-type/list',
    method: 'GET',
    signal: config?.abortSignal,
    params: {
      country,
    },
  });

  return data;
}
