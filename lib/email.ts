// Email stub - in production replace with Resend or similar service
// TODO: Replace with real email service

interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  // Simulate async email sending
  console.log('📧 [EMAIL STUB] Would send email:');
  console.log('  To:', options.to);
  console.log('  Subject:', options.subject);
  if (options.text) {
    console.log('  Body:', options.text.substring(0, 100) + '...');
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return Promise.resolve(true);
}

export async function sendWelcomeEmail(user: { name: string; email: string }): Promise<boolean> {
  console.log(`📧 [EMAIL STUB] Welcome email for ${user.name}`);
  
  return sendEmail({
    to: user.email,
    subject: 'Welcome to Frontend Masters Wiki!',
    text: `Hi ${user.name},\n\nWelcome to our wiki platform! You can now create and edit wiki pages.\n\nBest regards,\nThe Wiki Team`,
    html: `
      <h2>Welcome ${user.name}!</h2>
      <p>You've successfully joined the Frontend Masters Wiki.</p>
      <p>You can now:</p>
      <ul>
        <li>Browse existing wiki pages</li>
        <li>Create new pages</li>
        <li>Edit and improve content</li>
      </ul>
      <p>Happy writing!</p>
    `
  });
}

export async function sendPageUpdateNotification(
  page: { title: string; id: number },
  users: Array<{ email: string; name: string }>
): Promise<boolean> {
  console.log(`📧 [EMAIL STUB] Page update notification for "${page.title}"`);
  console.log(`  Would notify ${users.length} users`);
  
  // In production, send to all users
  const emailPromises = users.map(user => 
    sendEmail({
      to: user.email,
      subject: `Wiki Page Updated: ${page.title}`,
      text: `Hi ${user.name},\n\nThe wiki page "${page.title}" has been updated.\n\nView it here: /wiki/${page.id}\n\nBest regards,\nThe Wiki Team`
    })
  );
  
  await Promise.all(emailPromises);
  return true;
}

export async function sendPasswordResetEmail(
  user: { email: string; name: string },
  resetToken: string
): Promise<boolean> {
  console.log(`📧 [EMAIL STUB] Password reset for ${user.email}`);
  console.log(`  Reset token: ${resetToken}`);
  
  return sendEmail({
    to: user.email,
    subject: 'Reset Your Password',
    text: `Hi ${user.name},\n\nClick this link to reset your password: /reset-password?token=${resetToken}\n\nThis link expires in 1 hour.\n\nBest regards,\nThe Wiki Team`
  });
}