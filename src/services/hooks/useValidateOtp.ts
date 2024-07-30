import { useDToast } from '@dynamic-framework/ui-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../store/hooks';
import { getRequestUser } from '../../store/selectors';
import { clearCreationProcess } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import apiUserRequestMapper from '../mappers/apiRequestUserMapper';
import { UserRepository } from '../repositories';

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
      toast({
        title: t('toast.userCreatedSuccess'),
        theme: 'success',
      }, {
        duration: 5000,
      });
    } catch (e) {
      errorHandler(e);
      setLoading(false);
      close();
      toast({
        title: 'toast.userCreatedError',
        theme: 'danger',
      }, {
        duration: 5000,
      });
    }
  }, [dispatch, requestUser, toast, t]);

  return {
    loading,
    callback,
  };
}
