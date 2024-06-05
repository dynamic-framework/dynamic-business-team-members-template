export type ApiErrorItem = {
  status: string;
  code: string;
  title: string;
  messageCode: string;
  detail: string;
};

export type ApiPaymentStatus =
| 'COMPLETED'
| 'UNPROCESSABLE'
| 'PENDING_AUTH'
| 'PROCESSING'
| 'REJECTED'
| 'UNKNOWN';

export type ApiStatus =
| 'VALID'
| 'AMOUNT_RANGE_ERROR'
| 'ACCOUNT_NOT_REGISTERED'
| 'UNKNOWN';

export type ApiCategoryStatus =
 | 'VALID'
 | 'INVALID'
 | 'UNKNOWN';

export type ApiPaymentItem = {
  payment_id: string;
  payment_name: string;
  payment_creation_date: string;
  channel: string;
  agreement_id: string;
  digital_service: string;
  digital_service_id: string;
  payment_status: ApiPaymentStatus;
  payment_status_description: string;
  payment_count: number;
  payment_amount: number;
  payment_creator_username: string;
  payment_creator_name: string;
  payment_type: string;
};

export type ApiPresigned = {
  fileName: string;
  extension: string;
  fileFullName: string;
  presignedUrl: string;
};

export type ApiPaymentId = {
  payment_id: string;
};

export type ApiPayee = {
  payee_id: string;
  payee_name: string;
  payee_account_number: string;
  payee_bank_name: string;
  payee_type: string;
  currency: string;
  amount: number;
  status_category: ApiCategoryStatus;
  status: ApiStatus;
  detail_status: string;
};

export type ApiPayer = {
  payer_id: string;
  payer_account_number: string;
  payer_type: string;
  currency: string;
  amount: number;
  status_category: ApiCategoryStatus;
  status: ApiStatus;
  detail_status: string;
};

export type ApiPaymentDetail = {
  payment_index: ApiPaymentItem;
  payment_details: Array<ApiPayee>;
  payment_payer: ApiPayer;
};

// Accounts
export type ApiAccountAccountType = 'REGULAR_SAVINGS' | 'CURRENT_ACCOUNT' | 'LOAN' | 'CREDIT_CARD';

export type ApiAccountType = 'DEPOSIT' | 'LOAN';

export type ApiAccount = {
  id: string;
  nickName: string;
  accountNumber: string;
  type: ApiAccountType;
  accountType: ApiAccountAccountType;
  accountingBalance: number;
  availableBalance: number;
  currency: string;
  totalCharges: number;
  totalIncomes: number;
  closedAt: string | null;
  created: string;
  modified: string;
  status: string;
  depositDetails?: ApiDepositDetails | null;
  loanDetails?: ApiLoanDetails | null;
};

export type ApiDepositDetails = {
  balances: {
    total: number;
    available: number;
    unavailable: number;
  }
  overdraft?: {
    limit: number;
    total: number;
    available: number;
    expiryDate: string; // ISO8601
  } | null;
  maturityDate?: string | null; // ISO8601
  interest: {
    accrued: number;
    accruedNegative: number;
    settings?: {
      rateSettings?: {
        rate?: number | null;
        tiers?: number | null;
        terms?: string | null;
        source?: string | null;
      };
      paymentPoint: string | null;
      paymentDates: Array<Record<string, unknown>>;
    }
  }
};

export type ApiLoanDetails = {
  amount: number;
  balances: {
    owed: number;
    remaining: number;
  }
  due: number;
  daysInArrears: number | null;
  daysLate: number | null;
  installments: number;
  interest: {
    accrued: number;
    accruedInBillingCycle: number | null;
    accruedFromArrears: number;
    settings: {
      rate: number;
      rates: null;
      type: string;
      source: string;
    };
  };
};

export type ApiContact = {
  id: string;
  name: string;
  accountNumber: string;
  bank: string;
  image: string;
};

export type ApiActivity = {
  amount: number;
  currencyCode: string;
  id: string;
  type: string;
  description: string | null;
  effectiveDate: string;
};

// DOMAIN USERS

export type ApiUserIdentification = {
  type: string;
  number?: string;
  country?: string;
};

export type ApiUserCountry = {
  country: string;
  name: string;
};

export type ApiUserPhone = {
  country: string;
  number: string;
};

export type ApiUserRole = {
  role: string;
  role_name: string;
  user_count?: number;
};

export type ApiUserStatus = {
  label: string;
  action?: string;
  state: string;
  status: string;
  enabled: boolean;
  temporary?: boolean;
  malicious?: boolean;
  description?: string;
};

export type ApiUserNames = {
  first_name: string;
  primary_last_name: string;
  secondary_last_name?: string;
};

export type ApiUser = {
  username: string;
  email: string;
  name?: string;
  names?: ApiUserNames;
  identification: ApiUserIdentification;
  phone?: ApiUserPhone;
  role: ApiUserRole;
  last_session: string | null;
  status: ApiUserStatus;
  account_holder_key?: string;
  creation_date?: string;
};

export type ApiUserRequest = {
  username: string;
  role?: string;
  email: string;
  names: ApiUserNames;
  identification: ApiUserIdentification;
  phone: ApiUserPhone;
};

export type ApiUserUpdate = {
  email: string;
  names: ApiUserNames;
  phone: ApiUserPhone;
};

export type ApiCountryPhone = {
  country_code: string;
  country_name: string;
  dialing_code: string;
  country_flag: string;
};

// ROLES

export interface ApiRoleList {
  paging: {
    record_count: number;
    page_count: number;
    current_page: number;
    row_count: number;
  };
  contents: ApiRole[];
}

export interface ApiRole {
  role: string;
  role_name: string;
  description: string;
  user_count: number;
  created_by: {
    username: string;
    full_name: string;
  };
  status: {
    status: string;
    name: string;
    enables: boolean;
  };
  updated_date: string;
  actions?: string[];
}

export interface ApiRoleNode {
  node: string;
  title: string;
  description: string;
  parent?: string;
  permissions: number;
  granted: boolean;
  disabled: boolean;
  options?: ApiRoleNode[];
  nodes?: string[];
}

export type ApiUserPermissions = {
  permissions: Array<string>;
  role: {
    role: string;
    role_name: string;
  };
  user: {
    username: string;
    full_name: string;
  };
};
