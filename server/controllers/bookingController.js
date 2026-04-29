import { supabaseAdmin } from '../config/supabase.js';

export const createBooking = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, specialRequests } = req.body;
    console.log('📥 Booking request body:', req.body);

    if (!name || !email || !phone || !date || !time || !guests)
      return res.status(400).json({ message: 'Please fill in all required fields.' });

    const cleanPhone = String(phone).trim();
    if (!/^[0-9]{10}$/.test(cleanPhone))
      return res.status(400).json({ message: 'Enter a valid 10-digit phone number.' });

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime()))
      return res.status(400).json({ message: 'Invalid date selected.' });

    const parsedGuests = parseInt(guests, 10);
    if (isNaN(parsedGuests) || parsedGuests < 1 || parsedGuests > 20)
      return res.status(400).json({ message: 'Guests must be between 1 and 20.' });

    const sb = supabaseAdmin();
    const { data, error } = await sb.from('bookings').insert({
      user_id:          req.user?.id || null,
      name:             String(name).trim(),
      email:            String(email).trim().toLowerCase(),
      phone:            cleanPhone,
      date:             parsedDate.toISOString(),
      time:             String(time),
      guests:           parsedGuests,
      special_requests: specialRequests ? String(specialRequests).trim() : ''
    }).select().single();

    if (error) return res.status(400).json({ message: error.message });
    console.log('✅ Booking saved, ID:', data.id);
    res.status(201).json(mapBooking(data));
  } catch (error) {
    console.error('❌ Booking save error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const sb = supabaseAdmin();
    const { data, error } = await sb.from('bookings')
      .select('*').eq('user_id', req.user.id).order('created_at', { ascending: false });
    if (error) return res.status(500).json({ message: error.message });
    res.json(data.map(mapBooking));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const sb = supabaseAdmin();
    const { data, error } = await sb.from('bookings')
      .select('*').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ message: error.message });
    res.json(data.map(mapBooking));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const sb = supabaseAdmin();
    const { data, error } = await sb.from('bookings')
      .update({ status: req.body.status })
      .eq('id', req.params.id).select().single();
    if (error || !data) return res.status(404).json({ message: 'Booking not found' });
    res.json(mapBooking(data));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const sb = supabaseAdmin();
    const { error } = await sb.from('bookings').delete().eq('id', req.params.id);
    if (error) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Map snake_case → camelCase to keep frontend unchanged
const mapBooking = (row) => ({
  _id:             row.id,
  user:            row.user_id,
  name:            row.name,
  email:           row.email,
  phone:           row.phone,
  date:            row.date,
  time:            row.time,
  guests:          row.guests,
  specialRequests: row.special_requests,
  status:          row.status,
  createdAt:       row.created_at
});
