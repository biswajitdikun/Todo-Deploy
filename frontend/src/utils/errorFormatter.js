export const formatValidationError = (error) => {
  if (!error) return 'Please check your input and try again.';

  // Handle Mongoose validation errors
  if (error.message && error.message.includes('validation failed')) {
    const field = error.message.split('`')[1];
    const message = error.message.split('(')[1].split(')')[0];
    
    // Create user-friendly messages
    if (message.includes('shorter than the minimum allowed length')) {
      if (field === 'username') {
        return 'Username must be at least 3 characters long';
      }
      return `${field} is too short`;
    }
    if (message.includes('unique')) {
      if (field === 'username') {
        return 'This username is already taken. Please choose a different one.';
      }
      if (field === 'email') {
        return 'This email is already registered. Please use a different email or try logging in.';
      }
      return `This ${field} is already in use`;
    }
    if (message.includes('required')) {
      if (field === 'username') {
        return 'Please enter a username (minimum 3 characters)';
      }
      if (field === 'email') {
        return 'Please enter your email address';
      }
      if (field === 'password') {
        return 'Please enter a password';
      }
      return `${field} is required`;
    }
    if (message.includes('valid email')) {
      return 'Please enter a valid email address (e.g., name@example.com)';
    }
    if (message.includes('password')) {
      return 'Your password must meet all the requirements shown below';
    }
  }

  // Handle specific error messages
  if (error.message) {
    if (error.message.includes('Invalid credentials')) {
      return 'The email or password you entered is incorrect. Please try again.';
    }
    if (error.message.includes('Failed to register')) {
      return 'Registration failed. Please check your information and try again.';
    }
    if (error.message.includes('network')) {
      return 'Connection failed. Please check your internet connection and try again.';
    }
  }

  // Default error message
  return 'An error occurred. Please try again or contact support if the problem persists.';
}; 