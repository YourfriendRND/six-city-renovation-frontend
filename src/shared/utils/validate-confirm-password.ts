export function validateRepeatedPassword (
  password: string, 
  confirmPassword: string
): string | undefined {
  switch (true) {
    case !confirmPassword:
      return 'Repeat password';
    case password !== confirmPassword:
      return 'Passwords do not match';
    default:
      return undefined;
  }
};
