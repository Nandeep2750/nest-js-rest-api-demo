export const MESSAGE = Object.freeze({
  SUCCESS: {
    ADMIN_REGISTRATION_SUCCESS: 'Admin registered successfully.',
    USER_REGISTRATION_SUCCESS: 'User registered successfully.',
    ADMIN_LOGIN_SUCCESS: 'Admin logged in successfully.',
    USER_LOGIN_SUCCESS: 'User logged in successfully.',
    PROFILE_UPDATED_SUCCESS: 'Profile updated successfully.',
    PASSWORD_CHANGED_SUCCESS: 'Password changed successfully.',
    CATEGORY_UPDATED_SUCCESS: 'Category updated successfully.',
    CATEGORY_DELETE_SUCCESS: 'Category deleted successfully.',
    CATEGORY_CREATE_SUCCESS: 'Category created successfully.',
    CATEGORY_LIST_FETCH_SUCCESS: 'Categories list fetched successfully.',
    CATEGORY_FETCH_SUCCESS: 'Category fetched successfully.',
    PRODUCT_CREATE_SUCCESS: 'Product created successfully.',
    PRODUCT_LIST_FETCH_SUCCESS: 'Product list fetched successfully.',
    PRODUCT_FETCH_SUCCESS: 'Product fetched successfully.',
    PRODUCT_UPDATED_SUCCESS: 'Category updated successfully.',
  },
  ERROR: {
    EMAIL_ALREADY_EXISTS: 'Email already used by other please use another one.',
    INVALID_LOGIN_CREDENTIALS: 'Please check Credentials.',
    PASSWORDS_SHOULD_NOT_MATCH:
      'The old password and the new password should not be the same.',
    OLD_PASSWORD_NOT_VALID: 'Old password is not valid.',
    NO_USER_FOR_ID: 'No user available for given user ID.',
    NO_ADMIN_FOR_ID: 'No admin available for given admin ID.',
    CATEGORY_ALREADY_EXISTS:
      'Category name is already available, please try another one.',
    CATEGORY_NOT_FOUND: 'Category not found.',
    PRODUCT_NOT_FOUND: 'Product not found.',
  },
});
