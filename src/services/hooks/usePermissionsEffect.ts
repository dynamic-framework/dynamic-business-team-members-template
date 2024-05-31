/* eslint-disable max-len */
import { useEffect } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { setPermissions, setWidgetStep } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { UserRepository } from '../repositories';

export default function usePermissionsEffect() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        const data = await UserRepository.permissions(
          {
            config: { abortSignal: abortController.signal },
          },
        );
        dispatch(setPermissions(data.permissions));
        dispatch(setWidgetStep('list'));
      } catch (e) {
        errorHandler(e);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [dispatch]);
}
