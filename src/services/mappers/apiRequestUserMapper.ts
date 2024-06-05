import { ApiUserRequest } from '../api-interface';
import { UserRequest } from '../interface';

export default function apiUserRequestMapper(userRequest: UserRequest): ApiUserRequest {
  return {
    username: userRequest.username!,
    email: userRequest.email,
    identification: {
      number: userRequest.identification.number,
      type: userRequest.identification.type,
      country: userRequest.identification.country,
    },
    names: {
      first_name: userRequest.names.firstName,
      primary_last_name: userRequest.names.primaryLastName,
      secondary_last_name: userRequest.names.secondaryLastName,
    },
    phone: {
      country: userRequest.phone.country,
      number: userRequest.phone.number,
    },
    role: userRequest.role,
  };
}
