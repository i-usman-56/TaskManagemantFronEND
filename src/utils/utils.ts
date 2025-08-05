export function maskEmail(email: string) {
  const [username, domain] = email.split("@");
  if (username.length <= 2) {
    return `${username[0]}*${"@" + domain}`;
  }
  const maskedUsername =
    username[0] +
    "*".repeat(username.length - 4) +
    username[username.length - 1];
  return `${maskedUsername}@${domain}`;
}

export function maskPhoneNumber(phoneNumber: string): string {
  // Remove any non-digit characters
  const cleanNumber = phoneNumber.replace(/\D/g, "");

  // Check if number has at least 2 digits
  if (cleanNumber.length < 2) {
    return cleanNumber;
  }

  // Get last 2 digits
  const lastTwoDigits = cleanNumber.slice(-2);

  // Create mask of x's for remaining digits
  const mask = "x".repeat(cleanNumber.length - 2);

  return mask + lastTwoDigits;
}