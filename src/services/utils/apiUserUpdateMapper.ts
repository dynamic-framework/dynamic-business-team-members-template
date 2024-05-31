import {
  ApiUserUpdate,
  UserUpdate,
} from '@modyo-dynamic/modyo-service-business';

export default function apiUserUpdateMapper(user: UserUpdate): ApiUserUpdate {
  return {
    email: user.email,
    names: {
      first_name: user.names.firstName,
      primary_last_name: user.names.primaryLastName,
      secondary_last_name: user.names.secondaryLastName,
    },
    phone: {
      country: user.phone.country,
      number: user.phone.number,
    },
  };
}
