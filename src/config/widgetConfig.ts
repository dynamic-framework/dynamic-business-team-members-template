import { User, UserStatus } from '../services';
import liquidParser from '../utils/liquid-parser';

export const SITE_LANG = liquidParser.parse('{{site.language}}');
export const SITE_URL = liquidParser.parse('{{site.url}}');

export const VARS_CURRENCY = {
  symbol: liquidParser.parse('{{vars.currency-symbol}}'),
  precision: Number(liquidParser.parse('{{vars.currency-precision}}')),
  separator: liquidParser.parse('{{vars.currency-separator}}'),
  decimal: liquidParser.parse('{{vars.currency-decimal}}'),
};

// PATHs
export const SITE_PATH = {
  DASHBOARD: liquidParser.parse('{{vars.path-dashboard}}'),
  MASS_PAYMENTS_QUERY: liquidParser.parse('{{vars.path-mass-payments-query}}'),
  MASS_PAYMENTS: liquidParser.parse('{{vars.path-mass-payments}}'),
};

// DATE FORMAT
export const FORMAT_DATE = liquidParser.parse('{{vars.format-date}}');
export const FORMAT_DATE_FULL = liquidParser.parse('{{vars.format-date-full}}');

// STEPS
export const WIDGET_STEPS = {
  list: 'list',
  edition: 'edition',
  init: 'init',
  error: 'error',
};

export const CREATION_STEPS = {
  role: 'role',
  add: 'add',
  overview: 'overview',
};

// TYPES
export type SitePath = keyof typeof SITE_PATH;
export type WidgetStep = keyof typeof WIDGET_STEPS;
export type CreationStep = keyof typeof CREATION_STEPS;
export type UpdateUserStatus = {
  username: string;
  status: UserStatus;
};

export type AvailablePortal = {
  offcanvasRoleDetail: {
    role: string;
  };
  offcanvasUserDetail: {
    username: string;
  };
  offcanvasUserEdit: {
    user: User;
  };
  offcanvasValidateOtp: undefined;
  modalNoRoles: undefined;
  modalChangeUserStatus: {
    user: User;
  };
};

export const PERMISSIONS = {
  teamMember: 'TEAM_ACTION',
  listMembers: 'USERS_ACTION',
  createMember: 'CREATE_USER_ACTION',
  updateMember: 'UPDATE_USER_ACTION',
  updateRoleMember: 'UPDATE_USER_ROLE_ACTION',
  updateStatusMember: 'UPDATE_USER_STATUS_ACTION',
};

export const CONTEXT_CONFIG = {
  language: SITE_LANG,
  currency: VARS_CURRENCY,
};
