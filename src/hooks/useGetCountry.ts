import { useCallback } from 'react';

import useCountriesEffect from '../services/hooks/useCountriesEffect';

export default function useGetCountry() {
  const { countries } = useCountriesEffect();

  const getCountryById = useCallback((countryId: string) => {
    const findCountry = countries.find(({ country }) => country === countryId);

    return findCountry ? findCountry.name : 'Invalid country code';
  }, [countries]);

  return {
    getCountryById,
  };
}
