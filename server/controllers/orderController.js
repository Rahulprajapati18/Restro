import { supabaseAdmin } from '../config/supabase.js';

export const createOrder = async (req, res) => {
  try {
    console.log('📥 Order request:', JSON.stringify(req.body, null, 2));
    const { customerName, customerPhone, customerEmail, items, totalAmount, orderType, addOnMessage, deliveryAddress } = req.body;

    if (!customerName || !customerPhone)
      return res.status(400).json({ message: 'Name and phone are required.' });
    if (!/^[0-9]{10}$/.test(String(customerPhone).trim()))
      return res.status(400).json({ message: 'Enter a valid 10-digit phone number.' });
    if (!items || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: 'Add at least one item to order.' });
    if (orderType === 'delivery' && !deliveryAddress)
      return res.status(400).json({ message: 'Delivery address is required.' });

    const sb = supabaseAdmin();
    const { data, error } = await sb.from('orders').insert({
      user_id:          req.user?.id || null,
      customer_name:    String(customerName).trim(),
      customer_phone:   String(customerPhone).trim(),
      customer_email:   customerEmail ? String(customerEmail).trim() : '',
      items:            items.map(i => ({
        name: String(i.name), category: String(i.category || ''),
        price: Number(i.price), quantity: Number(i.quantity),
        modification: String(i.modification || '')
      })),
      total_amount:     Number(totalAmount),
      order_type:       orderType || 'dine-in',
      add_on_message:   addOnMessage ? String(addOnMessage) : '',
      delivery_address: deliveryAddress ? String(deliveryAddress) : '',
      payment_method:   req.body.paymentMethod || 'cod',
      payment_detail:   req.body.paymentDetail || '',
      payment_status:   req.body.paymentMethod === 'online' ? 'paid' : 'pending'
    }).select().single();

    if (error) return res.status(400).json({ message: error.message });
    console.log('✅ Order saved:', data.id);
    res.status(201).json(mapOrder(data));
  } catch (error) {
    console.error('❌ Order save error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const sb = supabaseAdmin();
    const { data, error } = await sb.from('orders')
      .select('*').eq('user_id', req.user.id).order('created_at', { ascending: false });
    if (error) return res.status(500).json({ message: error.message });
    res.json(data.map(mapOrder));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const sb = supabaseAdmin();
    const { data, error } = await sb.from('orders')
      .select('*, profiles(name, email)').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ message: error.message });
    res.json(data.map(row => ({ ...mapOrder(row), user: row.profiles })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const sb = supabaseAdmin();
    const { data, error } = await sb.from('orders')
      .update({ status: req.body.status })
      .eq('id', req.params.id).select().single();
    if (error || !data) return res.status(404).json({ message: 'Order not found' });
    res.json(mapOrder(data));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const mapOrder = (row) => ({
  _id:             row.id,
  user:            row.user_id,
  customerName:    row.customer_name,
  customerPhone:   row.customer_phone,
  customerEmail:   row.customer_email,
  items:           row.items,
  totalAmount:     row.total_amount,
  orderType:       row.order_type,
  addOnMessage:    row.add_on_message,
  deliveryAddress: row.delivery_address,
  paymentMethod:   row.payment_method,
  paymentDetail:   row.payment_detail,
  paymentStatus:   row.payment_status,
  status:          row.status,
  createdAt:       row.created_at
});
