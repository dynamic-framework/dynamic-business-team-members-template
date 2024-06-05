/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { ApiUser } from '../api-interface';
import type { User } from '../interface';

export default function userMapper(apiDomainUser: ApiUser): User {
  return {
    username: apiDomainUser.username,
    email: apiDomainUser.email,
    names: {
      firstName: apiDomainUser.names?.first_name!,
      primaryLastName: apiDomainUser.names?.primary_last_name!,
      secondaryLastName: apiDomainUser.names?.secondary_last_name,
    },
    identification: {
      number: apiDomainUser.identification.number,
      type: apiDomainUser.identification.type,
      country: apiDomainUser.identification.country,
    },
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
    phone: apiDomainUser.phone,
    creationDate: apiDomainUser.creation_date,
  };
}
