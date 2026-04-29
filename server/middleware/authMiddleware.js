import { supabase, supabaseAdmin } from '../config/supabase.js';

export const protect = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Not authorized, no token' });

  const token = header.split(' ')[1];
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ message: 'Not authorized, token failed' });

    // Get role from profiles
    const sb = supabaseAdmin();
    const { data: profile } = await sb.from('profiles')
      .select('name, role').eq('id', user.id).single();

    req.user = {
      _id:   user.id,
      id:    user.id,
      email: user.email,
      name:  profile?.name || '',
      role:  profile?.role || 'user'
    };
    req.token = token;
    next();
  } catch {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const optionalProtect = async (req, res, next) => {
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) {
    try {
      const token = header.split(' ')[1];
      const { data: { user } } = await supabase.auth.getUser(token);
      if (user) {
        const sb = supabaseAdmin();
        const { data: profile } = await sb.from('profiles')
          .select('name, role').eq('id', user.id).single();
        req.user = { _id: user.id, id: user.id, email: user.email, name: profile?.name || '', role: profile?.role || 'user' };
        req.token = token;
      }
    } catch { /* continue as guest */ }
  }
  next();
};

export const admin = (req, res, next) => {
  if (req.user?.role === 'admin') return next();
  res.status(403).json({ message: 'Not authorized as admin' });
};
