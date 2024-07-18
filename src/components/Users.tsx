import { DButton } from '@dynamic-framework/ui-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import useRolesCallback from '../services/hooks/useRolesCallback';
import { useAppDispatch } from '../store/hooks';
import { setCreationStep, setWidgetStep } from '../store/slice';
import usePermissions from '../utils/usePermission';

import ListUsers from './ListUsers';
import TableUsers from './tableUsers/TableUsers';

export default function Users() {
  const { hasPermission } = usePermissions();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { getRolesCallback, loading } = useRolesCallback();

  const addTeamMemberHandler = useCallback(() => {
    getRolesCallback(() => {
      dispatch(setWidgetStep('edition'));
      dispatch(setCreationStep('role'));
    });
  }, [getRolesCallback, dispatch]);

  return (
    <div className="d-flex flex-column gap-3">
      {hasPermission('createMember') && (
        <div className="d-flex justify-content-end">
          <DButton
            text={t('actions.addTeamMember')}
            pill
            onClick={addTeamMemberHandler}
            loading={loading}
            {...!loading && { iconStart: 'person-add' }}
          />
        </div>
      )}
      <div className="d-block d-lg-none">
        <ListUsers />
      </div>
      <div className="d-none d-lg-block">
        <TableUsers />
      </div>
    </div>
  );
}
