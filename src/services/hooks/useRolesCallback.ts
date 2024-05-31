import { useDPortalContext } from '@dynamic-framework/ui-react';
import { RoleRepository } from '@modyo-dynamic/modyo-service-business';
import { useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getRoles } from '../../store/selectors';
import { setRoles } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';

export default function useRolesCallback() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const roles = useAppSelector(getRoles);
  const { openPortal } = useDPortalContext();

  const getRolesCallback = useCallback(async (actions: () => void) => {
    const abortController = new AbortController();
    setLoading(true);

    try {
      const domainRoles = await RoleRepository.listSelector(
        {
          config: {
            abortSignal: abortController.signal,
          },
        },
      );

      if (domainRoles.length < 1) {
        openPortal('modalNoRoles', undefined);
        setLoading(false);
        return;
      }

      dispatch(setRoles(domainRoles));
      actions();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      errorHandler(e);
    }
  }, [dispatch, openPortal]);

  return {
    loading,
    roles,
    getRolesCallback,
  };
}
