import axios,
{
  AxiosError,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios';

import liquidParser from '../../utils/liquid-parser';
import type { ApiErrorItem } from '../api-interface';
import ApiError from '../utils/ApiError';

type RealmsMeResponse = {
  delegated_token: {
    access_token: string;
  };
};

const apiClient = axios.create({
  baseURL: liquidParser.parse('{{vars.api-path}}'),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const useAuthentication = liquidParser.parse('{{vars.use-authentication}}');

if (useAuthentication === 'true') {
  apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
      const accountURL = liquidParser.parse('{{account.url}}');
      const realm = liquidParser.parse('{{user.realm_uid}}');

      const {
        data: {
          delegated_token: {
            access_token: token,
          },
        },
      } = await axios<RealmsMeResponse>({
        url: `${accountURL}/api/customers/realms/${realm}/me`,
        method: 'get',
      });

      return ({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        } as AxiosRequestHeaders,
      });
    },
  );
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response && axios.isAxiosError<{ errors: Array<ApiErrorItem> }>(error)) {
      throw new ApiError(error.response.data.errors);
    }
    throw error;
  },
);

export default apiClient;
