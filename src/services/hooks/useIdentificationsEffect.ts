import { useEffect, useState } from 'react';

import errorHandler from '../../utils/errorHandler';
import { UserIdentificationType } from '../interface';
import { IdentificationRepository } from '../repositories';
import { ApiError } from '../utils';

export default function useIdentificationsEffect(country: string) {
  const [loading, setLoading] = useState(false);
  const [identifications, setIdentifications] = useState<Array<UserIdentificationType>>();

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const data = await IdentificationRepository.list(
          country,
          { abortSignal: abortController.signal },
        );
        setIdentifications(data);
        setLoading(false);
      } catch (e) {
        if ((e as ApiError).name === 'CanceledError') return;

        errorHandler(e);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [country]);

  return {
    loading,
    identifications,
  };
}
