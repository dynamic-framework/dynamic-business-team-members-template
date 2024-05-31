import { DChip, DCollapse } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import useWidgetUtils from '../hooks/useWidgetUtils';
import { USER_STATUS_COLOR, User, UserStatusColor } from '../services';

import TableUsersActions from './tableUsers/TableUsersActions';
import TableUsersRoleDetail from './tableUsers/TableUsersRoleDetail';

type Props = {
  user: User;
};

export default function ListUserItem({ user }: Props) {
  const { formatDate } = useWidgetUtils();
  const { t } = useTranslation();
  return (
    <DCollapse
      hasSeparator
      className="rounded-0 border-bottom collapse-user"
      Component={(
        <p className="fw-bold">{user.name}</p>
      )}
    >
      <div className="row row-cols-2">
        <p className="p-3 bg-gray-200">{t('table.id')}</p>
        <p className="p-3 text-gray-700 small">{user.identification.number}</p>
      </div>
      <div className="row row-cols-2">
        <p className="p-3 bg-gray-200">{t('table.role')}</p>
        <p className="p-3 text-gray-700">
          <TableUsersRoleDetail
            name={user.role.name}
            role={user.role.role}
          />
        </p>
      </div>
      <div className="row row-cols-2">
        <p className="p-3 bg-gray-200">{t('table.lastLogin')}</p>
        <p className="p-3 text-gray-700 small">{formatDate(user.lastSession, true)}</p>
      </div>
      <div className="row row-cols-2">
        <p className="p-3 bg-gray-200">{t('table.status')}</p>
        <div className="p-3 text-gray-700">
          <DChip
            text={user.status?.label}
            theme={USER_STATUS_COLOR[user.status?.status as UserStatusColor]}
          />
        </div>
      </div>
      <div className="row row-cols-2">
        <p className="p-3 bg-gray-200">{t('table.actions')}</p>
        <div className="p-2 text-gray-700 small">
          <TableUsersActions user={user} />
        </div>
      </div>
    </DCollapse>
  );
}
