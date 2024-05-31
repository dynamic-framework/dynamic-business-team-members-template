import {
  ApiCountryPhone,
  User,
  UserCountry,
  UserIdentificationType,
  UserRequest,
  UserRole,
} from '@modyo-dynamic/modyo-service-business';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { t } from 'i18next';

import {
  CreationStep,
  UpdateUserStatus,
  WidgetStep,
} from '../config/widgetConfig';

export type WidgetState = {
  users: Array<User>;
  widgetStep: WidgetStep;
  creationStep?: CreationStep;
  roles?: Array<UserRole>;
  selectedRole?: UserRole;
  requestUser?: UserRequest;
  countries: Array<UserCountry>;
  countriesPhone: Array<ApiCountryPhone>;
  identifications: Array<UserIdentificationType>;
  permissions: Array<string>;
};

const initialState = {
  users: [],
  widgetStep: 'init',
  countries: [{ name: t('userForm.placeholderCountries'), country: '' }],
  identifications: [{ description: t('userForm.placeholderIdentifications'), type: '' }],
  countriesPhone: [],
  permissions: [],
} as WidgetState;

const slice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<Array<User>>) {
      state.users = action.payload;
    },
    setWidgetStep(state, action: PayloadAction<WidgetStep>) {
      state.widgetStep = action.payload;
    },
    setCreationStep(state, action: PayloadAction<CreationStep | undefined>) {
      state.creationStep = action.payload;
    },
    setRoles(state, action: PayloadAction<Array<UserRole> | undefined>) {
      state.roles = action.payload;
    },
    setCountries(state, action: PayloadAction<Array<UserCountry> | undefined>) {
      state.countries = [...initialState.countries, ...(action.payload || [])];
    },
    setIdentifications(state, action: PayloadAction<Array<UserIdentificationType> | undefined>) {
      state.identifications = [...initialState.identifications, ...(action.payload || [])];
    },
    setCountriesPhone(state, action: PayloadAction<Array<ApiCountryPhone> | undefined>) {
      state.countriesPhone = [...(action.payload || [])];
    },
    setSelectedRole(state, action: PayloadAction<UserRole | undefined>) {
      state.selectedRole = action.payload;
    },
    setRequestUser(state, action: PayloadAction<UserRequest | undefined>) {
      state.requestUser = action.payload;
    },
    setUserStatus(state, action: PayloadAction<UpdateUserStatus>) {
      const { username, status } = action.payload;
      const userFound = state.users.find((user) => user.username === username);

      if (userFound) {
        userFound.status = status;
      }
    },
    setPermissions(state, action: PayloadAction<Array<string>>) {
      state.permissions = action.payload;
    },
    clearCreationProcess(state) {
      const restoreState = {
        selectedRole: undefined,
        creationStep: undefined,
        roles: [],
        requestUser: undefined,
        widgetStep: 'list',
      };

      Object.assign(state, restoreState);
    },
  },
});

export const {
  setUsers,
  setCreationStep,
  setWidgetStep,
  setRoles,
  setSelectedRole,
  setRequestUser,
  setUserStatus,
  clearCreationProcess,
  setCountries,
  setIdentifications,
  setCountriesPhone,
  setPermissions,
} = slice.actions;
export default slice.reducer;
