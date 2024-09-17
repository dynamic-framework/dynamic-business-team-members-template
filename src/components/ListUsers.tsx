import useUsersEffect from '../services/hooks/useUsersEffect';

import ListUserItem from './ListUserItem';
import UsersLoader from './loaders/UsersLoader';

export default function ListUsers() {
  const { loading, users } = useUsersEffect();

  if (loading) {
    return <UsersLoader />;
  }
  return (
    <div>
      {users.map((user) => (
        <ListUserItem key={user.username} user={user} />
      ))}
    </div>
  );
}
