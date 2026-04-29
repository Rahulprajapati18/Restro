import { supabaseAdmin } from '../config/supabase.js';

export const getMenuItems = async (req, res) => {
  try {
    const { category, search, vegetarian } = req.query;
    const sb = supabaseAdmin();
    let query = sb.from('menu_items').select('*').eq('is_available', true);

    if (category)          query = query.eq('category', category);
    if (vegetarian === 'true') query = query.eq('is_vegetarian', true);
    if (search)            query = query.ilike('name', `%${search}%`);

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) return res.status(500).json({ message: error.message });
    res.json(data.map(mapMenuItem));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMenuItem = async (req, res) => {
  try {
    const sb = supabaseAdmin();
    const { data, error } = await sb.from('menu_items').select('*').eq('id', req.params.id).single();
    if (error || !data) return res.status(404).json({ message: 'Menu item not found' });
    res.json(mapMenuItem(data));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMenuItem = async (req, res) => {
  try {
    const sb = supabaseAdmin();
    const { data, error } = await sb.from('menu_items').insert({
      name:           req.body.name,
      description:    req.body.description || '',
      price:          Number(req.body.price),
      category:       req.body.category,
      image:          req.file ? `/uploads/${req.file.filename}` : '',
      is_available:   req.body.isAvailable !== 'false',
      is_vegetarian:  req.body.isVegetarian === 'true',
      is_best_seller: req.body.isBestSeller === 'true',
      spice_level:    req.body.spiceLevel || 'None',
      tags:           req.body.tags ? JSON.parse(req.body.tags) : []
    }).select().single();
    if (error) return res.status(400).json({ message: error.message });
    res.status(201).json(mapMenuItem(data));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const sb = supabaseAdmin();
    const updates = { ...req.body };
    if (req.file) updates.image = `/uploads/${req.file.filename}`;
    // Convert camelCase to snake_case
    const row = {};
    if (updates.name)          row.name           = updates.name;
    if (updates.description)   row.description    = updates.description;
    if (updates.price)         row.price          = Number(updates.price);
    if (updates.category)      row.category       = updates.category;
    if (updates.image)         row.image          = updates.image;
    if (updates.isAvailable !== undefined) row.is_available = updates.isAvailable !== 'false';
    if (updates.isVegetarian !== undefined) row.is_vegetarian = updates.isVegetarian === 'true';
    if (updates.isBestSeller !== undefined) row.is_best_seller = updates.isBestSeller === 'true';
    if (updates.spiceLevel)    row.spice_level    = updates.spiceLevel;

    const { data, error } = await sb.from('menu_items').update(row).eq('id', req.params.id).select().single();
    if (error || !data) return res.status(404).json({ message: 'Menu item not found' });
    res.json(mapMenuItem(data));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const sb = supabaseAdmin();
    const { error } = await sb.from('menu_items').delete().eq('id', req.params.id);
    if (error) return res.status(404).json({ message: 'Menu item not found' });
    res.json({ message: 'Menu item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const mapMenuItem = (row) => ({
  _id:          row.id,
  name:         row.name,
  description:  row.description,
  price:        row.price,
  category:     row.category,
  image:        row.image,
  isAvailable:  row.is_available,
  isVegetarian: row.is_vegetarian,
  isBestSeller: row.is_best_seller,
  spiceLevel:   row.spice_level,
  tags:         row.tags,
  createdAt:    row.created_at
});
