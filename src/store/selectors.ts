import { UserRequest } from '@modyo-dynamic/modyo-service-business';
import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { RootState } from './store';

const getState = (state: RootState) => state.widget;

export const getUsers = createDraftSafeSelector(
  getState,
  (widget) => widget.users,
);

export const getWidgetStep = createDraftSafeSelector(
  getState,
  (widget) => widget.widgetStep,
);

export const getCreationStep = createDraftSafeSelector(
  getState,
  (widget) => widget.creationStep,
);

export const getRoles = createDraftSafeSelector(
  getState,
  (widget) => widget.roles,
);

export const getCountries = createDraftSafeSelector(
  getState,
  (widget) => widget.countries,
);

export const getCountriesPhone = createDraftSafeSelector(
  getState,
  (widget) => widget.countriesPhone,
);

export const getIdentifications = createDraftSafeSelector(
  getState,
  (widget) => widget.identifications,
);

export const getSelectedRole = createDraftSafeSelector(
  getState,
  (widget) => widget.selectedRole,
);

export const getPermissions = createDraftSafeSelector(
  getState,
  (widget) => widget.permissions,
);

export const getRequestUser = createDraftSafeSelector(
  getState,
  getSelectedRole,
  (widget, role) => widget.requestUser || {
    username: '',
    email: '',
    names: {
      firstName: '',
      primaryLastName: '',
      secondaryLastName: '',
    },
    identification: {
      type: '',
      number: '',
      country: '',
    },
    phone: {
      number: '',
      country: '',
    },
    role: role?.role,
  } as UserRequest,
);
