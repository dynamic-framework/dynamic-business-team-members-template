import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCountriesPhone } from '../../store/selectors';
import { setCountriesPhone } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { CountryRepository } from '../repositories';
import { ApiError } from '../utils';

export default function useCountriesPhoneEffect() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const countriesPhone = useAppSelector(getCountriesPhone);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const data = await CountryRepository.phoneList({
          abortSignal: abortController.signal,
        });
        dispatch(setCountriesPhone(data));
        setLoading(false);
      } catch (e) {
        if ((e as ApiError).name === 'CanceledError') return;

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
    countriesPhone,
  };
}
