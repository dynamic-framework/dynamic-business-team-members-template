import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUsers } from '../../store/selectors';
import { setUsers } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { UserRepository } from '../repositories';

export default function useUsersEffect() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const users = useAppSelector(getUsers);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const Users = await UserRepository.list(
          100,
          1,
          { abortSignal: abortController.signal },
        );
        dispatch(setUsers(Users));
        setLoading(false);
      } catch (e) {
        errorHandler(e);
      }
    })();

    return () => {
      setLoading(false);
      abortController.abort();
    };
  }, [dispatch]);

  return {
    loading,
    users,
  };
}
