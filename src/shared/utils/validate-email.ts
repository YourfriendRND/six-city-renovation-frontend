export function validateEmail (email: string): string | undefined {
    switch (true) {
      case !email.trim():
        return 'Email required';
      case !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email): 
        return 'Invalid email';
      default:
        return undefined;
    }
};
