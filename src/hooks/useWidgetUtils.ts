/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useFormatCurrency } from '@dynamic-framework/ui-react';
import { ROLE } from '@modyo-dynamic/modyo-service-business';
import { DateTime } from 'luxon';
import { useCallback } from 'react';

import {
  FORMAT_DATE,
  FORMAT_DATE_FULL,
  USER_ROLE,
  SITE_URL,
  SitePath,
  SITE_PATH,
} from '../config/widgetConfig';

export default function useWidgetUtils() {
  const { format } = useFormatCurrency();

  const formatDate = useCallback((
    date?: string | null,
    isFull = false,
  ) => {
    if (typeof date !== 'string') {
      return 'No date';
    }
    const dateISO = DateTime.fromISO(date);
    return dateISO.isValid ? dateISO.toFormat(isFull ? FORMAT_DATE_FULL : FORMAT_DATE) : date;
  }, []);

  const formatCurrency = useCallback(
    (amount: number) => format(amount),
    [format],
  );

  const navigateTo = useCallback((path: SitePath) => {
    window.location.href = `${SITE_URL}/${SITE_PATH[path]}`;
  }, []);

  const isRole = (
    role: ROLE,
  ) => USER_ROLE === role;

  const unicodeToEmoji = useCallback((unicodeSequence: string) => {
    if (unicodeSequence) {
      const unicodeCodes = unicodeSequence.split(' ').map((code) => parseInt(code.replace('U+', ''), 16));
      const emojiValue = String.fromCodePoint(...unicodeCodes);

      return emojiValue;
    }

    return '';
  }, []);

  return {
    formatCurrency,
    formatDate,
    navigateTo,
    isRole,
    unicodeToEmoji,
  };
}
