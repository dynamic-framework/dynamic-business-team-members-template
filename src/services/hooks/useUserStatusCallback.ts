import { useDPortalContext, useDToast } from '@dynamic-framework/ui-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../store/hooks';
import { setUserStatus, setWidgetStep } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { ApiUserStatus } from '../api-interface';
import { User } from '../interface';
import { UserRepository } from '../repositories';

export default function useUserStatusCallback() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const { closePortal } = useDPortalContext();
  const { t } = useTranslation();
  const { toast } = useDToast();

  const changeStatus = useCallback(async (
    user: User,
    status: ApiUserStatus,
  ) => {
    const abortController = new AbortController();
    setLoading(true);
    try {
      await UserRepository.changeStatus(
        user.username,
        status.status,
        { abortSignal: abortController.signal },
      );

      closePortal();
      dispatch(setWidgetStep('list'));
      dispatch(setUserStatus({
        username: user.username,
        status: {
          enabled: status.enabled,
          label: status.label,
          state: status.state,
          status: status.status,
        },
      }));
      setLoading(false);
      toast(
        {
          title: t('toast.changeRoleSuccess', { newStatus: status.status }),
          theme: 'success',
        },
        {
          duration: 3000,
        },
      );
    } catch (e) {
      errorHandler(e);

      setLoading(false);
      closePortal();
      toast(
        {
          title: t('toast.changeRoleError'),
          theme: 'danger',
        },
        {
          duration: 3000,
        },
      );
    }
  }, [dispatch, closePortal, toast, t]);

  return {
    loading,
    changeStatus,
  };
}
