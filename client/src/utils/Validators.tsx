type RegisterForm = {
  username: string;
  password: string;
  confirmPassword: string;
};

export const UsernameValidator = (username: string) => {
  if (!username) {
    return "Username is required";
  } else if (!new RegExp(/^[a-zA-Z0-9]{4,}$/).test(username)) {
    return "Incorrect username format";
  }
  return "";
};

export const PasswordValidator = (password: string) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 8) {
    return "Password must have a minimum 8 characters";
  }
  return "";
};

export const ConfirmPasswordValidator = (
  confirmPassword: string,
  form: RegisterForm
) => {
  if (!confirmPassword) {
    return "Confirm password is required";
  } else if (confirmPassword.length < 8) {
    return "Must be minimum 8 characters";
  } else if (confirmPassword !== form.password) {
    return "Passwords do not match";
  }
  return "";
};
