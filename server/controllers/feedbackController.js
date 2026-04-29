import { supabaseAdmin } from '../config/supabase.js';

export const createFeedback = async (req, res) => {
  try {
    const { name, rating, message } = req.body;
    if (!rating || rating < 1 || rating > 5)
      return res.status(400).json({ message: 'Rating is required (1–5).' });

    const sb = supabaseAdmin();
    const { data, error } = await sb.from('feedback').insert({
      name:    name?.trim() || 'Anonymous',
      rating:  Number(rating),
      message: message?.trim() || ''
    }).select().single();

    if (error) return res.status(400).json({ message: error.message });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const sb = supabaseAdmin();
    const { data, error } = await sb.from('feedback')
      .select('*').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ message: error.message });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
