import type { GenericAbortSignal } from 'axios';

import liquidParser from '../../utils/liquid-parser';
import { ApiCountryPhone } from '../api-interface';
import ApiClient from '../clients/apiClient';
import { UserCountry } from '../interface';

import countriesMock from './mocks/countries.json';
import countriesPhoneMock from './mocks/countriesPhone.json';

export async function list(
  config?: { abortSignal: GenericAbortSignal },
) {
  if (liquidParser.parse('{{vars.mock-team-members}}') === 'true') {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(0);
      }, 1000);
    });
    return countriesMock as Array<UserCountry>;
  }

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
  if (liquidParser.parse('{{vars.mock-team-members}}') === 'true') {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(0);
      }, 1000);
    });
    return countriesPhoneMock as Array<ApiCountryPhone>;
  }

  const { data } = await ApiClient.request<Array<ApiCountryPhone>>({
    url: '/dialing-countries',
    method: 'GET',
    signal: config?.abortSignal,
  });

  return data;
}
