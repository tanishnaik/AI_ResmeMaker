export function validateRegister(body) {
  const errors = [];
  if (!body.name?.trim()) errors.push('Name is required.');
  if (!/^\S+@\S+\.\S+$/.test(body.email || '')) errors.push('Valid email is required.');
  if (!body.password || body.password.length < 6) errors.push('Password must be at least 6 characters.');
  return errors;
}

export function validateLogin(body) {
  const errors = [];
  if (!/^\S+@\S+\.\S+$/.test(body.email || '')) errors.push('Valid email is required.');
  if (!body.password) errors.push('Password is required.');
  return errors;
}

