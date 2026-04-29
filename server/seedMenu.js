import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY
);

const menuItems = [
  // Veg Starter
  { name: 'Mushroom Pakoda',    description: 'Crispy fried mushrooms with spices',          price: 59,  category: 'Veg Starter',          is_vegetarian: true,  is_best_seller: false, spice_level: 'Medium' },
  { name: 'Crispy Paneer',      description: 'Golden fried paneer with tangy sauce',         price: 79,  category: 'Veg Starter',          is_vegetarian: true,  is_best_seller: true,  spice_level: 'Mild'   },
  { name: 'Paneer Tikka',       description: 'Marinated paneer grilled in tandoor',          price: 249, category: 'Veg Starter',          is_vegetarian: true,  is_best_seller: true,  spice_level: 'Medium' },
  { name: 'Hara Bhara Kabab',   description: 'Spinach and pea patties with mint chutney',   price: 199, category: 'Veg Starter',          is_vegetarian: true,  is_best_seller: false, spice_level: 'Mild'   },
  { name: 'Chilli Paneer',      description: 'Indo-Chinese style spicy paneer',              price: 249, category: 'Veg Starter',          is_vegetarian: true,  is_best_seller: true,  spice_level: 'Hot'    },

  // Non-Veg Starter
  { name: 'Chicken Tikka',      description: 'Tandoor grilled chicken with spices',          price: 299, category: 'Non-Veg Starter',      is_vegetarian: false, is_best_seller: true,  spice_level: 'Medium' },
  { name: 'Chicken Lollipop',   description: 'Crispy chicken lollipops with sauce',          price: 269, category: 'Non-Veg Starter',      is_vegetarian: false, is_best_seller: true,  spice_level: 'Hot'    },
  { name: 'Chicken Pakora',     description: 'Battered fried chicken pieces',                price: 229, category: 'Non-Veg Starter',      is_vegetarian: false, is_best_seller: false, spice_level: 'Medium' },
  { name: 'Chilli Chicken',     description: 'Indo-Chinese spicy chicken',                   price: 279, category: 'Non-Veg Starter',      is_vegetarian: false, is_best_seller: true,  spice_level: 'Hot'    },

  // Main Course Veg
  { name: 'Paneer Butter Masala', description: 'Creamy tomato-based paneer curry',           price: 279, category: 'Main Course Veg',      is_vegetarian: true,  is_best_seller: true,  spice_level: 'Mild'   },
  { name: 'Kadai Paneer',       description: 'Paneer cooked with bell peppers and spices',   price: 269, category: 'Main Course Veg',      is_vegetarian: true,  is_best_seller: true,  spice_level: 'Medium' },
  { name: 'Dal Tadka',          description: 'Yellow lentils tempered with spices',          price: 199, category: 'Main Course Veg',      is_vegetarian: true,  is_best_seller: false, spice_level: 'Mild'   },
  { name: 'Dal Makhani',        description: 'Slow cooked black lentils in butter',          price: 249, category: 'Main Course Veg',      is_vegetarian: true,  is_best_seller: true,  spice_level: 'Mild'   },
  { name: 'Aloo Gobi',          description: 'Potato and cauliflower dry curry',             price: 199, category: 'Main Course Veg',      is_vegetarian: true,  is_best_seller: false, spice_level: 'Medium' },
  { name: 'Mix Veg',            description: 'Seasonal vegetables in rich gravy',            price: 229, category: 'Main Course Veg',      is_vegetarian: true,  is_best_seller: false, spice_level: 'Medium' },

  // Main Course Non-Veg
  { name: 'Butter Chicken',     description: 'Tender chicken in creamy tomato sauce',        price: 349, category: 'Main Course Non-Veg',  is_vegetarian: false, is_best_seller: true,  spice_level: 'Mild'   },
  { name: 'Chicken Curry',      description: 'Classic Indian chicken curry',                 price: 299, category: 'Main Course Non-Veg',  is_vegetarian: false, is_best_seller: true,  spice_level: 'Medium' },
  { name: 'Chicken Kadai',      description: 'Chicken with peppers in kadai masala',         price: 329, category: 'Main Course Non-Veg',  is_vegetarian: false, is_best_seller: false, spice_level: 'Hot'    },
  { name: 'Egg Curry',          description: 'Boiled eggs in spiced onion-tomato gravy',     price: 229, category: 'Main Course Non-Veg',  is_vegetarian: false, is_best_seller: false, spice_level: 'Medium' },
  { name: 'Mutton Curry',       description: 'Slow cooked mutton in rich masala',            price: 399, category: 'Main Course Non-Veg',  is_vegetarian: false, is_best_seller: true,  spice_level: 'Hot'    },

  // Biryani
  { name: 'Chicken Biryani',    description: 'Aromatic basmati rice with spiced chicken',    price: 299, category: 'Biryani',              is_vegetarian: false, is_best_seller: true,  spice_level: 'Medium' },
  { name: 'Mutton Biryani',     description: 'Slow cooked mutton with fragrant rice',        price: 379, category: 'Biryani',              is_vegetarian: false, is_best_seller: true,  spice_level: 'Medium' },
  { name: 'Egg Biryani',        description: 'Spiced rice with boiled eggs',                 price: 229, category: 'Biryani',              is_vegetarian: false, is_best_seller: false, spice_level: 'Medium' },
  { name: 'Veg Biryani',        description: 'Fragrant rice with mixed vegetables',          price: 249, category: 'Biryani',              is_vegetarian: true,  is_best_seller: false, spice_level: 'Mild'   },
  { name: 'Paneer Biryani',     description: 'Aromatic rice with spiced paneer',             price: 279, category: 'Biryani',              is_vegetarian: true,  is_best_seller: true,  spice_level: 'Mild'   },

  // Breads
  { name: 'Butter Naan',        description: 'Soft leavened bread with butter',              price: 49,  category: 'Breads',               is_vegetarian: true,  is_best_seller: true,  spice_level: 'None'   },
  { name: 'Garlic Naan',        description: 'Naan topped with garlic and butter',           price: 69,  category: 'Breads',               is_vegetarian: true,  is_best_seller: true,  spice_level: 'None'   },
  { name: 'Tandoori Roti',      description: 'Whole wheat bread from tandoor',               price: 39,  category: 'Breads',               is_vegetarian: true,  is_best_seller: false, spice_level: 'None'   },
  { name: 'Lachha Paratha',     description: 'Layered flaky whole wheat bread',              price: 79,  category: 'Breads',               is_vegetarian: true,  is_best_seller: false, spice_level: 'None'   },

  // Chinese
  { name: 'Veg Hakka Noodles',  description: 'Stir fried noodles with vegetables',           price: 199, category: 'Chinese',              is_vegetarian: true,  is_best_seller: false, spice_level: 'Medium' },
  { name: 'Chicken Noodles',    description: 'Stir fried noodles with chicken',              price: 229, category: 'Chinese',              is_vegetarian: false, is_best_seller: true,  spice_level: 'Medium' },
  { name: 'Veg Fried Rice',     description: 'Wok tossed rice with vegetables',              price: 189, category: 'Chinese',              is_vegetarian: true,  is_best_seller: false, spice_level: 'Mild'   },
  { name: 'Chicken Fried Rice', description: 'Wok tossed rice with chicken',                 price: 219, category: 'Chinese',              is_vegetarian: false, is_best_seller: true,  spice_level: 'Mild'   },

  // Dessert
  { name: 'Gulab Jamun',        description: 'Soft milk dumplings in sugar syrup',           price: 99,  category: 'Dessert',              is_vegetarian: true,  is_best_seller: true,  spice_level: 'None'   },
  { name: 'Rasmalai',           description: 'Soft cottage cheese in sweetened milk',        price: 129, category: 'Dessert',              is_vegetarian: true,  is_best_seller: true,  spice_level: 'None'   },
  { name: 'Ice Cream',          description: 'Assorted flavours of ice cream',               price: 119, category: 'Dessert',              is_vegetarian: true,  is_best_seller: false, spice_level: 'None'   },
  { name: 'Gajar Ka Halwa',     description: 'Carrot pudding with dry fruits',               price: 149, category: 'Dessert',              is_vegetarian: true,  is_best_seller: false, spice_level: 'None'   },

  // Beverage
  { name: 'Mineral Water',      description: 'Chilled mineral water bottle',                 price: 20,  category: 'Beverage',             is_vegetarian: true,  is_best_seller: false, spice_level: 'None'   },
  { name: 'Cold Drink',         description: 'Assorted cold beverages',                      price: 59,  category: 'Beverage',             is_vegetarian: true,  is_best_seller: false, spice_level: 'None'   },
  { name: 'Masala Chai',        description: 'Spiced Indian tea',                            price: 49,  category: 'Beverage',             is_vegetarian: true,  is_best_seller: true,  spice_level: 'None'   },
  { name: 'Lassi',              description: 'Chilled yogurt drink sweet or salted',         price: 99,  category: 'Beverage',             is_vegetarian: true,  is_best_seller: true,  spice_level: 'None'   },
  { name: 'Cold Coffee',        description: 'Chilled coffee with milk and ice cream',       price: 149, category: 'Beverage',             is_vegetarian: true,  is_best_seller: false, spice_level: 'None'   },
];

const seed = async () => {
  console.log('🌱 Seeding menu items to Supabase...');

  // Clear existing items first
  const { error: delError } = await sb.from('menu_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (delError) console.warn('Clear warning:', delError.message);

  const { data, error } = await sb.from('menu_items').insert(menuItems).select();
  if (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }

  console.log(`✅ Seeded ${data.length} menu items successfully`);
  process.exit(0);
};

seed();
