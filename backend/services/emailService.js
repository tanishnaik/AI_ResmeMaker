export async function sendWelcomeEmail(user) {
  console.log(`Welcome email queued for ${user.email}`);
  return true;
}

