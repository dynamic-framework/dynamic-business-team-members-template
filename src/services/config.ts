export const PAYMENT_STATUS_COLOR = {
  COMPLETED: 'success',
  UNPROCESSABLE: 'danger',
  PENDING_AUTH: 'info',
  PROCESSING: 'warning',
  REJECTED: 'danger',
  UNKNOWN: 'light',
};

export const STATUS_COLOR = {
  VALID: 'success',
  INVALID: 'danger',
  UNKNOWN: 'warning',
};

export type ROLE = 'operator' | 'authorizer' | 'admin';

// Accounts

export enum AccountBaseType {
  Deposit = 'deposit',
  Loan = 'loan',
}

export enum AccountType {
  Saving = 'saving',
  Checking = 'checking',
  CreditCard = 'credit-card',
  Loan = 'loan',
}

export const AccountTypeConfig = {
  [AccountType.Checking]: {
    name: 'Checking',
    theme: 'danger',
    icon: 'cash-coin',
  },
  [AccountType.Saving]: {
    name: 'Savings',
    theme: 'info',
    icon: 'piggy-bank',
  },
  [AccountType.CreditCard]: {
    name: 'Credit Cards',
    theme: 'secondary',
    icon: 'credit-card',
  },
  [AccountType.Loan]: {
    name: 'Loans',
    theme: 'warning',
    icon: 'cash-stack',
  },
};

export const ApiAccountTypeConfig = {
  REGULAR_SAVINGS: AccountType.Saving,
  CURRENT_ACCOUNT: AccountType.Checking,
  LOAN: AccountType.Loan,
  CREDIT_CARD: AccountType.CreditCard,
};

// Activity
export enum ActivityStatus {
  Completed = 'completed',
  Rejected = 'rejected',
  Failed = 'failed',
  InProgress = 'in_progress',
}

// USER

export const USER_STATUS_COLOR = {
  CREATED: 'light',
  ACTIVE: 'success',
  INACTIVE: 'danger',
  BLOCKED: 'warning',
  SUSPENDED: 'info',
  UNKNOWN: 'dark',
};

export type UserStatusColor = keyof typeof USER_STATUS_COLOR;
