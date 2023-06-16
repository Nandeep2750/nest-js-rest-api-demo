export const USER_CONFIG = Object.freeze({
  PASSWORD: {
    MIN: 8,
    MAX: 20,
  },
  GENDER: {
    MALE: 'Male',
    FEMALE: 'Female',
  },
  SALT_ROUNDS: 10,
  STATUS_TYPE: {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    PENDING: 'Pending',
  },
  JWT_KEY: 'auth.secret.user',
  TOKEN_EXPIRES_IN: '1h',
});

export const ACCOUNT_TYPE = Object.freeze({
  USER: 'User',
  ADMIN: 'Admin',
});
