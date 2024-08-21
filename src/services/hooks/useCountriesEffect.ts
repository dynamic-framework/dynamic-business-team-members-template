import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCountries } from '../../store/selectors';
import { setCountries } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { CountryRepository } from '../repositories';
import { ApiError } from '../utils';

export default function useCountriesEffect() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const countries = useAppSelector(getCountries);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const data = await CountryRepository.list({
          abortSignal: abortController.signal,
        });
        dispatch(setCountries(data));
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
    countries,
  };
}
