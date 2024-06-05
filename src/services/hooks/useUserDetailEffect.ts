import { useEffect, useState } from 'react';

import errorHandler from '../../utils/errorHandler';
import { User } from '../interface';
import { UserRepository } from '../repositories';

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
        setLoading(false);
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
