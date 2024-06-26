import { useEffect, useState } from 'react';

import errorHandler from '../../utils/errorHandler';
import { UserStatus } from '../interface';
import { StatusRepository } from '../repositories';

export default function useStatusEffect(status: string) {
  const [loading, setLoading] = useState(false);
  const [statusList, setStatusList] = useState<UserStatus[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const data = await StatusRepository.list(
          status,
          { abortSignal: abortController.signal },
        );

        setLoading(false);
        setStatusList(data);
      } catch (e) {
        setLoading(false);
        errorHandler(e);
      }
    })();

    return () => {
      setLoading(false);
      abortController.abort();
    };
  }, [status]);

  return {
    loading,
    statusList,
  };
}
