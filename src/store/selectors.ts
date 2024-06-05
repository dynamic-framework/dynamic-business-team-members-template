import { createSelector } from '@reduxjs/toolkit';

import { UserRequest } from '../services';

import { RootState } from './store';

const getState = (state: RootState) => state.widget;

export const getUsers = createSelector(
  getState,
  (widget) => widget.users,
);

export const getWidgetStep = createSelector(
  getState,
  (widget) => widget.widgetStep,
);

export const getCreationStep = createSelector(
  getState,
  (widget) => widget.creationStep,
);

export const getRoles = createSelector(
  getState,
  (widget) => widget.roles,
);

export const getCountries = createSelector(
  getState,
  (widget) => widget.countries,
);

export const getCountriesPhone = createSelector(
  getState,
  (widget) => widget.countriesPhone,
);

export const getIdentifications = createSelector(
  getState,
  (widget) => widget.identifications,
);

export const getSelectedRole = createSelector(
  getState,
  (widget) => widget.selectedRole,
);

export const getPermissions = createSelector(
  getState,
  (widget) => widget.permissions,
);

export const getRequestUser = createSelector(
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
