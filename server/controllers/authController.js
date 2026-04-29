import { supabase, supabaseAdmin } from '../config/supabase.js';

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ message: 'Please provide a valid email address' });
    if (password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });

    // Sign up with Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ message: error.message });

    const userId = data.user.id;
    const sb = supabaseAdmin();

    // Create profile row using service role (bypasses RLS)
    const { error: profileError } = await sb.from('profiles').upsert({
      id:    userId,
      name:  name.trim(),
      email: email.toLowerCase().trim(),
      role:  'user'
    }, { onConflict: 'id' });

    if (profileError) {
      console.error('Profile creation error:', profileError.message);
      // Don't fail registration — profile can be created on next login
    }

    console.log('✅ User registered:', email);

    res.status(201).json({
      _id:   userId,
      name:  name.trim(),
      email: email.toLowerCase().trim(),
      role:  'user',
      token: data.session?.access_token || ''
    });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Please provide email and password' });

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(401).json({ message: 'Invalid email or password' });

    const sb = supabaseAdmin();

    // Get profile — create it if missing (handles users who registered before profile trigger)
    let { data: profile } = await sb.from('profiles')
      .select('name, role').eq('id', data.user.id).single();

    if (!profile) {
      // Auto-create missing profile
      await sb.from('profiles').upsert({
        id:    data.user.id,
        name:  data.user.user_metadata?.name || email.split('@')[0],
        email: data.user.email,
        role:  'user'
      }, { onConflict: 'id' });
      profile = { name: data.user.user_metadata?.name || email.split('@')[0], role: 'user' };
    }

    console.log('✅ User logged in:', email);

    res.json({
      _id:   data.user.id,
      name:  profile.name,
      email: data.user.email,
      role:  profile.role || 'user',
      token: data.session.access_token
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// GET /api/auth/profile
export const getProfile = async (req, res) => {
  try {
    const sb = supabaseAdmin();
    const { data } = await sb.from('profiles')
      .select('id, name, email, phone, role, created_at')
      .eq('id', req.user.id).single();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/auth/users  (admin)
export const getAllUsers = async (req, res) => {
  try {
    const sb = supabaseAdmin();
    const { data, error } = await sb.from('profiles')
      .select('id, name, email, phone, role, created_at')
      .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ message: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
