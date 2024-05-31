import { useDToast } from '@dynamic-framework/ui-react';
import { UserRepository } from '@modyo-dynamic/modyo-service-business';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../store/hooks';
import { getRequestUser } from '../../store/selectors';
import { clearCreationProcess } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import apiUserRequestMapper from '../utils/apiRequestUserMapper';

export default function useValidateOtp() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const requestUser = useAppSelector(getRequestUser);
  const { toast } = useDToast();
  const { t } = useTranslation();

  const callback = useCallback(async (otp: string, close: () => void) => {
    const abortController = new AbortController();
    setLoading(true);

    try {
      await UserRepository.create(
        apiUserRequestMapper(requestUser),
        { abortSignal: abortController.signal },
      );
      setLoading(false);
      close();
      dispatch(clearCreationProcess());
      toast(t('toast.userCreatedSuccess'), {
        type: 'success',
        autoClose: 5000,
      });
    } catch (e) {
      errorHandler(e);
      setLoading(false);
      close();
      toast('toast.userCreatedError', {
        type: 'danger',
        autoClose: 5000,
      });
    }
  }, [dispatch, requestUser, toast, t]);

  return {
    loading,
    callback,
  };
}
