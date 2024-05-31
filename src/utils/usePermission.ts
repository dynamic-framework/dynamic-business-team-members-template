import { useCallback } from 'react';

import { PERMISSIONS } from '../config/widgetConfig';
import { useAppSelector } from '../store/hooks';
import { getPermissions } from '../store/selectors';

export default function usePermissions() {
  const permissions = useAppSelector(getPermissions);

  const hasPermission = useCallback(
    (
      permission: keyof typeof PERMISSIONS,
    ) => permissions.includes(PERMISSIONS[permission]),
    [permissions],
  );

  return {
    hasPermission,
  };
}
