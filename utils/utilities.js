export function isEmail(input) {
  // Check if the input is a string
  if (typeof input !== "string") {
    return false;
  }

  // Split the input by '@' symbol
  const parts = input.split("@");

  // Check if there are two parts after splitting
  if (parts.length !== 2) {
    return false;
  }

  // Check if the first part contains at least one character
  if (parts[0].length < 1) {
    return false;
  }

  // Check if the second part contains at least one '.' character
  if (!parts[1].includes(".")) {
    return false;
  }

  return true;
}

export function isEmailRegex(input) {
  // Regular expression for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
}
