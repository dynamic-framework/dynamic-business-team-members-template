import { useEffect, useState } from 'react';

import errorHandler from '../../utils/errorHandler';
import { User } from '../interface';
import { UserRepository } from '../repositories';
import { ApiError } from '../utils';

export default function useUserDetailEffect(username: string) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const data = await UserRepository.get(
          username,
          { abortSignal: abortController.signal },
        );

        setLoading(false);
        setUser(data);
      } catch (e) {
        if ((e as ApiError).name === 'CanceledError') return;

        errorHandler(e);
      }
    })();

    return () => {
      setLoading(false);
      abortController.abort();
    };
  }, [username]);

  return {
    loading,
    user,
  };
}
