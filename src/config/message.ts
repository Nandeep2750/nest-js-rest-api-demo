export const MESSAGE = Object.freeze({
  SUCCESS: {
    USER_REGISTRATION_SUCCESS: 'User registered successfully.',
    USER_LOGIN_SUCCESS: 'User logged in successfully.',
    PROFILE_UPDATED_SUCCESS: 'Profile updated successfully.',
    PASSWORD_CHANGED_SUCCESS: 'Password changed successfully.',
  },
  ERROR: {
    EMAIL_ALREADY_EXISTS:
      'Email already used by other user please use another one.',
    INVALID_LOGIN_CREDENTIALS: 'Please check Credentials.',
    PASSWORDS_SHOULD_NOT_MATCH:
      'The old password and the new password should not be the same.',
    OLD_PASSWORD_NOT_VALID: 'Old password is not valid.',
    NO_USER_FOR_ID: 'No user available for given user ID.',
  },
});
