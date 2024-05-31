import { useCallback } from 'react';

import useCountriesPhoneEffect from '../services/hooks/useCountriesPhoneEffect';

export default function useGetCountryPhone() {
  const { countriesPhone } = useCountriesPhoneEffect();

  const getCountryPhoneByCode = useCallback((countryCode: string) => {
    const findCountry = countriesPhone.find(({ country_code }) => country_code === countryCode);

    return findCountry ? findCountry.dialing_code : '+XX';
  }, [countriesPhone]);

  return {
    getCountryPhoneByCode,
  };
}
