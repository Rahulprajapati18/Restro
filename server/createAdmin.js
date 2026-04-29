import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY
);

const createAdmin = async () => {
  const email    = 'admin@samridhii.com';
  const password = 'admin123';
  const name     = 'Admin';

  // Try sign up first
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });

  let userId;
  if (signUpError && signUpError.message.includes('already registered')) {
    // User exists — get their ID via sign in
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) { console.error('Sign in error:', signInError.message); process.exit(1); }
    userId = signInData.user.id;
    console.log('✅ Existing user found:', email);
  } else if (signUpError) {
    console.error('Sign up error:', signUpError.message);
    process.exit(1);
  } else {
    userId = signUpData.user.id;
    console.log('✅ New admin user created:', email);
  }

  // Upsert profile with admin role
  const { error: profileError } = await supabase.from('profiles').upsert({
    id: userId, name, email, role: 'admin'
  });

  if (profileError) {
    console.error('Profile error:', profileError.message);
    process.exit(1);
  }

  console.log('✅ Admin profile set — email:', email, '| password: admin123');
  process.exit(0);
};

createAdmin();
