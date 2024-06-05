import { ApiUser } from '../api-interface';
import type { User } from '../interface';

export default function userItemMapper(apiDomainUser: ApiUser): User {
  return {
    username: apiDomainUser.username,
    email: apiDomainUser.email,
    name: apiDomainUser.name,
    identification: apiDomainUser.identification,
    role: {
      name: apiDomainUser.role.role_name,
      role: apiDomainUser.role.role,
    },
    lastSession: apiDomainUser.last_session,
    status: {
      enabled: apiDomainUser.status.enabled,
      label: apiDomainUser.status.label,
      state: apiDomainUser.status.state,
      status: apiDomainUser.status.status,
    },
    accountHolderKey: apiDomainUser.account_holder_key,
    creationDate: apiDomainUser.creation_date,
  };
}
