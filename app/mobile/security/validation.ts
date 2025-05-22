import * as EmailValidator from 'email-validator';

/**
 * Validate an email address
 * @param email the email to check
 * @returns true if the address is valid
 */
export function validateEmail(email: string): boolean {
  // f this shi, just use a good validator
  // const pattern = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]{2,}(\.[a-z]{2,})+$/;
  // return pattern.test(email);

  return EmailValidator.validate(email);
}
