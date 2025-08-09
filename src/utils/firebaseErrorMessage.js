export const firebaseErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid Email Address!";
    case "auth/user-disabled":
      return "This account has been disabled!";
    case "auth/invalid-credential":
      return "Invalid credential";
    case "auth/missing-password":
      return "Missing password";
    case "auth/missing-email":
      return "Missing email";
    case "auth/weak-password":
      return "Weak password";
    case "auth/email-already-in-use":
      return "Email already in use";
    default:
      return "Something went wrong. Please try again later.";
  }
};
