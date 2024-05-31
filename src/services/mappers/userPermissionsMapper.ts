import { ApiUserPermissions } from '../api-interface';
import { UserPermissions } from '../interface';

export default function userPermissionsMapper(data: ApiUserPermissions): UserPermissions {
  return {
    permissions: data.permissions,
  };
}
