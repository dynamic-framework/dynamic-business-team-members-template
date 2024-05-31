import { IdentificationRepository } from '@modyo-dynamic/modyo-service-business';
import { useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getIdentifications } from '../../store/selectors';
import { setIdentifications } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';

export default function useIdentificationsCallback() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const identifications = useAppSelector(getIdentifications);

  const getIdentificationsCallback = useCallback(async (country: string) => {
    const abortController = new AbortController();
    setLoading(true);

    try {
      const data = await IdentificationRepository.list(
        country,
        { abortSignal: abortController.signal },
      );
      dispatch(setIdentifications(data));
      setLoading(false);
    } catch (e) {
      errorHandler(e);
    }
  }, [dispatch]);

  return {
    loading,
    identifications,
    getIdentificationsCallback,
  };
}
