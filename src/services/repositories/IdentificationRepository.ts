import type { GenericAbortSignal } from 'axios';

import liquidParser from '../../utils/liquid-parser';
import { ApiUserCountry } from '../api-interface';
import ApiClient from '../clients/apiClient';
import { UserIdentificationType } from '../interface';

import identificationsMock from './mocks/identifications.json';

export async function list(
  country: ApiUserCountry['country'],
  config?: { abortSignal: GenericAbortSignal },
) {
  if (liquidParser.parse('{{vars.mock-team-members}}') === 'true') {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(0);
      }, 1000);
    });
    return identificationsMock as Array<UserIdentificationType>;
  }

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
