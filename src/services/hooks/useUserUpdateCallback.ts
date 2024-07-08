import { useDPortalContext, useDToast } from '@dynamic-framework/ui-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { AvailablePortal } from '../../config/widgetConfig';
import { clearCreationProcess } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { User, UserRole, UserUpdate } from '../interface';
import apiUserUpdateMapper from '../mappers/apiUserUpdateMapper';
import { UserRepository } from '../repositories';

export default function useUserUpdateCallback() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useDToast();
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext<AvailablePortal>();

  const updateUserCallback = useCallback(async (
    user: User,
    updateUser: UserUpdate,
    role?: UserRole,
  ) => {
    const abortController = new AbortController();
    setLoading(true);

    try {
      await UserRepository.update(
        user.username,
        apiUserUpdateMapper(updateUser),
        { abortSignal: abortController.signal },
      );

      if (user.status && user.status.state !== 'NEW' && role) {
        await UserRepository.changeRole(
          user.username,
          role.role,
          { abortSignal: abortController.signal },
        );
      }

      toast(
        {
          title: t('toast.userUpdateSuccess'),
          theme: 'success',
        },
        {
          duration: 5000,
        },
      );
      dispatch(clearCreationProcess());
      closePortal();
      setLoading(false);
    } catch (e) {
      errorHandler(e);
      setLoading(false);
      toast({
        title: t('toast.userUpdateError'),
        theme: 'danger',
      }, {
        duration: 5000,
      });
    }
  }, [closePortal, dispatch, t, toast]);

  return {
    loading,
    updateUserCallback,
  };
}
