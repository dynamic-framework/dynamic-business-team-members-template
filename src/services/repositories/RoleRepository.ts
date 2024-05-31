import type { GenericAbortSignal } from 'axios';

import liquidParser from '../../utils/liquid-parser';
import { ApiUserRole } from '../api-interface';
import ApiClient from '../clients/apiClient';
import { UserRole } from '../interface';
import roleMapper from '../mappers/roleMapper';

import rolesMock from './mocks/roles.json';

export async function listSelector(
  props?: {
    config?: { abortSignal: GenericAbortSignal }
  },
) {
  if (liquidParser.parse('{{vars.mock-team-members}}') === 'true') {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(0);
      }, 1000);
    });
    return rolesMock.map<UserRole>((rol) => roleMapper(rol));
  }

  const { data } = await ApiClient.request<Array<ApiUserRole>>({
    url: '/roles-selector',
    method: 'GET',
    signal: props?.config?.abortSignal,
  });

  return data.map((rol) => roleMapper(rol));
}
