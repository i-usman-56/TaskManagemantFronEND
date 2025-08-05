export function checkPasswordStrength(
  password: string,
  fullName?: string,
  email?: string
) {
  const defaultChecks = {
    length: false,
    number: false,
    symbol: false,
    nameEmail: true,
  };

  if (!password) return { strength: "", score: 0, checks: defaultChecks };

  let score = 0;
  const checks = {
    length: password.length >= 8,
    number: /\d/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    nameEmail: true,
  };

  // Check if password contains name or email
  if (fullName || email) {
    const containsName = fullName
      ?.toLowerCase()
      .split(" ")
      .some((part) => password.toLowerCase().includes(part));
    const containsEmail = email?.toLowerCase().split("@")[0] || "";
    checks.nameEmail = !(
      containsName || password.toLowerCase().includes(containsEmail)
    );
  }

  // Calculate score
  if (checks.length) score += 1;
  if (checks.number || checks.symbol) score += 1;
  if (checks.nameEmail) score += 1;

  const strength = score === 3 ? "Strong" : score === 2 ? "Medium" : "Weak";

  return { strength, score, checks };
}
