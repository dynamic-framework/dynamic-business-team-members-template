import { IdentificationRepository, UserIdentificationType } from '@modyo-dynamic/modyo-service-business';
import { useEffect, useState } from 'react';

import errorHandler from '../../utils/errorHandler';

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
