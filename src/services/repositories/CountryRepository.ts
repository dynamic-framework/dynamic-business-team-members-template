import type { GenericAbortSignal } from 'axios';

import { ApiCountryPhone } from '../api-interface';
import ApiClient from '../clients/apiClient';
import { UserCountry } from '../interface';

export async function list(
  config?: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<Array<UserCountry>>({
    url: '/countries',
    method: 'GET',
    signal: config?.abortSignal,
  });

  return data;
}

export async function phoneList(
  config?: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<Array<ApiCountryPhone>>({
    url: '/dialing-countries',
    method: 'GET',
    signal: config?.abortSignal,
  });

  return data;
}
