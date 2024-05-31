import { AccountBaseType, AccountType, ActivityStatus } from './config';

export type Status =
| 'VALID'
| 'AMOUNT_RANGE_ERROR'
| 'ACCOUNT_NOT_REGISTERED'
| 'UNKNOWN';

export type StatusPayment =
| 'COMPLETED'
| 'UNPROCESSABLE'
| 'PENDING_AUTH'
| 'PROCESSING'
| 'REJECTED'
| 'UNKNOWN';

export type StatusCategory =
 | 'VALID'
 | 'INVALID'
 | 'UNKNOWN';

export type Payee = {
  accountNumber: string;
  amount: number,
  bank: string;
  id: string;
  name: string;
  status: Status,
  statusCategory: StatusCategory;
  statusDetail: string;
};

export type PaymentDetail = {
  amount: number,
  account: string;
  count: number,
  creationDate: string,
  creatorId: string;
  creatorName: string,
  id: string;
  name: string;
  status: StatusPayment;
  statusDescription: string;
};

export type Payment = {
  details: PaymentDetail,
  records: Array<Payee>;
};

export type PaymentItem = {
  amount: number;
  count: number;
  creationDate: string;
  creator: string;
  id: string;
  name: string;
  paymentType: string;
  status: StatusPayment;
  statusDescription: string;
};

// Accounts
export type Contact = {
  id: string;
  name: string;
  accountNumber: string;
  bank: string;
  image: string;
};

export type Activity = {
  id: string;
  name: string;
  date: string;
  amount: number;
  status: ActivityStatus;
};

export type Category = {
  id: string;
  name: string;
  type: AccountType;
  accounts: Array<Account>;
};

export type BaseAccount<T extends AccountBaseType> = {
  id: string;
  name: string;
  alias?: string;
  accountNumber: string;
  type: AccountType;
  baseType: T;
};

export type DepositAccount = BaseAccount<AccountBaseType.Deposit> & {
  balanceAvailable: number;
};

export type LoanAccount = BaseAccount<AccountBaseType.Loan> & {
  balanceOwed: number;
  balanceRemaining: number;
};

export type Account = DepositAccount | LoanAccount;

// DOMAIN USERS

export type UserIdentification = {
  type: UserIdentificationType['type'];
  number?: string;
  country?: string;
};

export type UserCountry = {
  country: string;
  name: string;
};

export type UserPhone = {
  country: string;
  number: string;
};

export type UserRole = {
  role: string;
  name: string;
};

export type UserStatus = {
  status: string;
  enabled: boolean;
  label: string;
  state: string;
};

export type UserNames = {
  firstName: string;
  primaryLastName: string;
  secondaryLastName?: string;
};

export type User = {
  username: string;
  email: string;
  name?: string;
  names?: UserNames;
  identification: UserIdentification;
  phone?: UserPhone;
  role: UserRole;
  lastSession?: null | string;
  status?: UserStatus;
  accountHolderKey?: string;
  creationDate?: string;
};

export type UserRequest = {
  username?: string;
  role: string;
  email: string;
  names: UserNames;
  identification: UserIdentification;
  phone: UserPhone;
};

export type UserUpdate = {
  email: string;
  names: UserNames;
  phone: UserPhone;
};

export type UserIdentificationType = {
  type: string;
  description: string;
};

export type CountryPhone = {
  countryCode: string;
  countryName: string;
  dialingCode: string;
  flag: string;
};

// ROLES

export interface RoleList {
  paging: {
    recordCount: number;
    pageCount: number;
    currentPage: number;
    rowCount: number;
  };
  contents: Role[];
}

export interface Role {
  role: string
  roleName: string
  description: string
  userCount: number
  createdBy: {
    username: string
    fullName: string
  }
  status: {
    status: string
    name: string
    enables: boolean
  }
  updatedDate: string
}

export type UserPermissions = {
  permissions: Array<string>;
};
