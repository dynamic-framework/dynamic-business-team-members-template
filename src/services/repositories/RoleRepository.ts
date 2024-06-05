import type { GenericAbortSignal } from 'axios';

import { ApiUserRole } from '../api-interface';
import ApiClient from '../clients/apiClient';
import roleMapper from '../mappers/roleMapper';

export async function listSelector(
  props?: {
    config?: { abortSignal: GenericAbortSignal }
  },
) {
  const { data } = await ApiClient.request<Array<ApiUserRole>>({
    url: '/roles-selector',
    method: 'GET',
    signal: props?.config?.abortSignal,
  });

  return data.map((rol) => roleMapper(rol));
}
