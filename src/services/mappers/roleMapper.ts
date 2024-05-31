import type { ApiUserRole } from '../api-interface';
import type { UserRole } from '../interface';

export default function roleMapper(apiDomainUserRole: ApiUserRole): UserRole {
  return {
    name: apiDomainUserRole.role_name,
    role: apiDomainUserRole.role,
  };
}
