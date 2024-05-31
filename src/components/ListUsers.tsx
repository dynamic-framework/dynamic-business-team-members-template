import { useTranslation } from 'react-i18next';

import useUsersEffect from '../services/hooks/useUsersEffect';

import ListUserItem from './ListUserItem';

export default function ListUsers() {
  const { loading, users } = useUsersEffect();
  const { t } = useTranslation();

  if (loading) {
    return <>{t('actions.loading')}</>;
  }
  return (
    <div>
      {users.map((user) => (
        <ListUserItem key={user.username} user={user} />
      ))}
    </div>
  );
}
