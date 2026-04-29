# 🍽️ Samridhii — Fine Indian Dining Restaurant Web Application

A full-stack, production-ready restaurant web application built with the MERN-inspired stack, featuring online ordering, table reservations, admin dashboard, UPI payments, and real-time data management powered by Supabase.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend Components](#frontend-components)
- [Backend Architecture](#backend-architecture)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Features](#features)
- [How to Run](#how-to-run)

---

## 🎯 Project Overview

**Samridhii** (meaning "prosperity" in Sanskrit) is a complete restaurant management and customer-facing web application. It serves two audiences:

- **Customers** — Browse menu, place orders, book tables, track orders, submit feedback, make UPI payments
- **Restaurant Admin/Owner** — Manage bookings, orders, menu items, view registered users, and read customer feedback through a dedicated dashboard

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI framework — component-based architecture |
| **Vite** | Build tool and dev server (fast HMR) |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **Framer Motion** | Animations — page transitions, hover effects, loading screens |
| **React Router DOM v6** | Client-side routing and navigation |
| **Axios** | HTTP client for API calls |
| **React DatePicker** | Date selection in booking form |
| **qrcode.react** | UPI QR code generation on frontend |
| **@supabase/supabase-js** | Supabase client for auth token management |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework for REST API |
| **Supabase** | PostgreSQL database + Auth + Row Level Security |
| **@supabase/supabase-js** | Supabase client for database operations |
| **Multer** | File upload middleware (menu item images) |
| **dotenv** | Environment variable management |
| **CORS** | Cross-origin resource sharing |

### Database
| Technology | Purpose |
|---|---|
| **Supabase PostgreSQL** | Primary database (replaces MongoDB) |
| **Supabase Auth** | User authentication (JWT-based) |
| **Row Level Security (RLS)** | Data isolation per user |

### Tools & Services
| Tool | Purpose |
|---|---|
| **Supabase Dashboard** | Database management, user management, SQL editor |
| **Postman / Thunder Client** | API testing |
| **MongoDB Compass** | (Legacy — replaced by Supabase) |

---

## 📁 Project Structure

```
Project/
├── client/                          # React Frontend
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── icons.svg
│   │   └── _redirects               # Netlify SPA routing
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js               # Axios base configuration
│   │   ├── components/
│   │   │   ├── CustomCursor.jsx     # Custom mouse cursor
│   │   │   ├── Footer.jsx           # Footer with feedback form
│   │   │   ├── LoadingScreen.jsx    # First-visit loading animation
│   │   │   ├── Navbar.jsx           # Navigation bar with auth state
│   │   │   ├── PageTransition.jsx   # Page transition wrapper
│   │   │   └── UPIPayment.jsx       # UPI payment gateway modal
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Global auth state management
│   │   ├── pages/
│   │   │   ├── About.jsx            # About page
│   │   │   ├── Auth.jsx             # Login / Register page
│   │   │   ├── Booking.jsx          # Table reservation page
│   │   │   ├── Contact.jsx          # Contact page with map
│   │   │   ├── Dashboard.jsx        # Admin dashboard
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Menu.jsx             # Full menu with filters
│   │   │   ├── MyOrders.jsx         # User's order history
│   │   │   └── Order.jsx            # Online food ordering
│   │   ├── App.jsx                  # Root component with routes
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles + Tailwind
│   ├── .env                         # Frontend env variables
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                          # Node.js Backend
    ├── config/
    │   └── supabase.js              # Supabase client configuration
    ├── controllers/
    │   ├── authController.js        # Register, login, profile, users
    │   ├── bookingController.js     # Table booking CRUD
    │   ├── feedbackController.js    # Customer feedback
    │   ├── menuController.js        # Menu item CRUD
    │   └── orderController.js       # Food order management
    ├── middleware/
    │   ├── authMiddleware.js        # JWT verification + role check
    │   └── upload.js                # Multer file upload config
    ├── routes/
    │   ├── authRoutes.js            # /api/auth/*
    │   ├── bookingRoutes.js         # /api/bookings/*
    │   ├── feedbackRoutes.js        # /api/feedback/*
    │   ├── menuRoutes.js            # /api/menu/*
    │   └── orderRoutes.js           # /api/orders/*
    ├── uploads/                     # Uploaded menu item images
    ├── createAdmin.js               # Script to create admin user
    ├── seedMenu.js                  # Script to seed 42 menu items
    ├── supabase_schema.sql          # Full database schema
    ├── index.js                     # Express server entry point
    ├── .env                         # Server environment variables
    └── package.json
```

---

## 🧩 Frontend Components

### Pages

#### `Home.jsx` — Landing Page
- Hero section with parallax background image
- Animated floating particles and rotating rings
- Radial gold glow effect
- Stats section (customers, menu items, experience, rating)
- Features section with 3D hover cards
- About preview with parallax
- CTA section with animated background
- Punchline: "Where Every Bite Tells a Story"

#### `Menu.jsx` — Full Menu
- 121 static menu items across 12 categories
- Category filter pills (Veg, Non-Veg, Biryani, Chicken, Chowmein, etc.)
- Search by dish name
- Best Seller toggle filter
- Compact card grid (5 columns on desktop)
- Veg/Non-veg indicator dot (green/red)
- 🔥 Best seller badge
- Hover animations with color-coded glow

#### `Order.jsx` — Online Food Ordering
- Same menu items as Menu page
- Add/remove items with quantity controls
- Per-item modification notes (modal popup)
- Sticky cart panel on right side
- Customer details form (name, phone, email)
- Order type selector (Dine-in / Takeaway / Delivery)
- Delivery address field (conditional)
- Add-on message for kitchen
- Payment method: Cash on Delivery or Online (UPI)
- UPI Payment Gateway modal (QR + App links + UPI ID)
- Success screen with order confirmation

#### `Booking.jsx` — Table Reservation
- Full name, email, phone (required, 10-digit validation)
- Date picker (min: today)
- Time slot selector (11:00 AM – 9:30 PM)
- Guest count (1–20)
- Special requests textarea
- Success screen with full booking summary
- Data saved to Supabase `bookings` table

#### `Auth.jsx` — Authentication
- Tab toggle: Login / Register
- Icon inputs with show/hide password
- Animated field transitions
- Slide animation when switching modes
- Error display with AnimatePresence
- JWT token stored in localStorage

#### `Dashboard.jsx` — Admin Panel
- Protected route (admin role only)
- 6 stat cards: Menu Items, Registered Users, Total Bookings, Total Orders, Pending Bookings, Total Feedback
- **Overview tab** — stats + recent bookings preview
- **Users tab** — all registered users with join date, role badge (👑 Admin / 👤 User)
- **Bookings tab** — all reservations with Confirm/Cancel buttons
- **Orders tab** — all orders with full item list, payment info, Accept/Preparing/Delivered/Cancel buttons
- **Feedback tab** — star ratings, messages, average rating badge
- **Menu tab** — all menu items with hover-reveal delete button

#### `MyOrders.jsx` — User Order History
- Protected route (logged-in users only)
- Collapsible order cards
- Shows items, quantities, modifications, total
- Payment method and status
- Delivery address and kitchen notes

#### `About.jsx` — About Page
- Animated background orbs
- Scroll-based parallax on header
- Stats counter section
- Our Story section with image
- Values cards with hover glow
- Awards & Recognition grid

#### `Contact.jsx` — Contact Page
- Contact info cards (address, phone, email, hours)
- Message form with focus animations
- Google Maps embed
- Form submission with success animation

### Components

#### `Navbar.jsx`
- Fixed top navigation
- SVG logo: "SAMRIDHII" with gold gradient, decorative flourishes, diamond ornaments
- Nav links: Home, Menu, Order, Booking, About, Contact
- Auth state: shows user name pill + role badge when logged in
- Admin: Dashboard link
- Mobile: hamburger menu with full mobile nav
- Logout button

#### `Footer.jsx`
- Feedback section with 5-star rating (pill buttons)
- Optional name + message textarea
- Submit sends to `/api/feedback` → Supabase
- Thank you animation on submit
- Quick links (including Order Online)
- Contact info (Indian address, phone, email)
- Social media links

#### `LoadingScreen.jsx`
- Shows only on first visit (sessionStorage flag)
- Two counter-rotating rings around gold "S"
- "Samridhii" title + "Fine Indian Dining" subtitle
- Progress bar
- Three bouncing dots

#### `UPIPayment.jsx`
- Three tabs: QR Code / UPI Apps / UPI ID
- QR Code: scannable with 5-minute countdown timer
- UPI Apps: GPay, PhonePe, Paytm, BHIM deep-links
- UPI ID: copy button + manual entry
- "I've Completed Payment" confirm button
- Sender UPI ID field for record keeping
- Success animation

#### `PageTransition.jsx`
- Wraps every page route
- Fade + slide animation on route change
- Uses Framer Motion AnimatePresence

#### `AuthContext.jsx`
- React Context for global auth state
- Stores user object in localStorage (`userInfo`)
- Provides: `user`, `login()`, `register()`, `logout()`, `loading`
- Token automatically included in API calls

---

## 🔧 Backend Architecture

### MVC Pattern
```
Request → Route → Middleware → Controller → Supabase → Response
```

### `config/supabase.js`
- `supabase` — anon key client (for auth operations)
- `supabaseAs(token)` — user-scoped client (respects RLS)
- `supabaseAdmin()` — service role client (bypasses RLS, for server-side operations)

### `middleware/authMiddleware.js`
- `protect` — verifies Supabase JWT, attaches `req.user`
- `optionalProtect` — attaches user if token present, continues as guest if not
- `admin` — checks `req.user.role === 'admin'`

### Controllers

#### `authController.js`
- `register` — Supabase Auth signUp + creates profile row
- `login` — Supabase Auth signIn + fetches profile (auto-creates if missing)
- `getProfile` — returns user profile
- `getAllUsers` — returns all profiles (admin only)

#### `bookingController.js`
- `createBooking` — validates phone (10-digit), date, guests → inserts to `bookings`
- `getBookings` — user's own bookings
- `getAllBookings` — all bookings (admin)
- `updateBookingStatus` — confirm/cancel/complete
- `deleteBooking` — remove booking

#### `orderController.js`
- `createOrder` — validates items, phone → inserts to `orders`
- `getOrders` — user's own orders
- `getAllOrders` — all orders with profile join (admin)
- `updateOrderStatus` — pending/confirmed/preparing/ready/delivered/cancelled

#### `menuController.js`
- `getMenuItems` — with category/search/vegetarian filters
- `getMenuItem` — single item by ID
- `createMenuItem` — with image upload (admin)
- `updateMenuItem` — update fields + image (admin)
- `deleteMenuItem` — remove item (admin)

#### `feedbackController.js`
- `createFeedback` — public, no auth required
- `getAllFeedback` — admin only

---

## 🗄️ Database Schema

### `profiles` table
```
id          uuid (FK → auth.users)
name        text
email       text
phone       text
role        text ('user' | 'admin')
created_at  timestamptz
```

### `menu_items` table
```
id            uuid
name          text
description   text
price         numeric
category      text
image         text
is_available  boolean
is_vegetarian boolean
is_best_seller boolean
spice_level   text
tags          text[]
created_at    timestamptz
```

### `bookings` table
```
id               uuid
user_id          uuid (nullable FK)
name             text
email            text
phone            text
date             timestamptz
time             text
guests           integer
special_requests text
status           text ('pending'|'confirmed'|'cancelled'|'completed')
created_at       timestamptz
```

### `orders` table
```
id               uuid
user_id          uuid (nullable FK)
customer_name    text
customer_phone   text
customer_email   text
items            jsonb  [{name, category, price, quantity, modification}]
total_amount     numeric
order_type       text ('dine-in'|'takeaway'|'delivery')
add_on_message   text
delivery_address text
payment_method   text ('cod'|'online')
payment_detail   text
payment_status   text ('pending'|'paid')
status           text ('pending'|'confirmed'|'preparing'|'ready'|'delivered'|'cancelled')
created_at       timestamptz
```

### `feedback` table
```
id         uuid
name       text
rating     integer (1–5)
message    text
created_at timestamptz
```

---

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login |
| GET | `/api/auth/profile` | ✅ | Get own profile |
| GET | `/api/auth/users` | 👑 Admin | Get all users |
| GET | `/api/menu` | ❌ | Get menu items |
| POST | `/api/menu` | 👑 Admin | Add menu item |
| PUT | `/api/menu/:id` | 👑 Admin | Update menu item |
| DELETE | `/api/menu/:id` | 👑 Admin | Delete menu item |
| POST | `/api/bookings` | ❌ | Create booking |
| GET | `/api/bookings` | ✅ | Get own bookings |
| GET | `/api/bookings/all` | 👑 Admin | Get all bookings |
| PUT | `/api/bookings/:id` | 👑 Admin | Update booking status |
| POST | `/api/orders` | ❌ | Place order |
| GET | `/api/orders` | ✅ | Get own orders |
| GET | `/api/orders/all` | 👑 Admin | Get all orders |
| PUT | `/api/orders/:id` | 👑 Admin | Update order status |
| POST | `/api/feedback` | ❌ | Submit feedback |
| GET | `/api/feedback/all` | 👑 Admin | Get all feedback |

---

## ✨ Features

### Customer Features
- 🏠 Animated landing page with parallax effects
- 🍽️ Full menu with 121 items across 12 categories
- 🔍 Search and filter by category, veg/non-veg, best sellers
- 🛒 Online food ordering with cart management
- 📝 Per-item modification notes
- 📅 Table reservation with date/time picker
- 💳 UPI payment gateway (QR code + app deep-links)
- 📦 Order history with collapsible details
- 💬 Feedback submission with star rating
- 🔐 Secure authentication (register/login)

### Admin Features
- 📊 Dashboard with 6 real-time stat cards
- 👥 Registered users list with join dates
- 📋 Booking management (confirm/cancel)
- 🍱 Order management (full pipeline: pending → delivered)
- 🗑️ Menu item management (add/delete)
- ⭐ Customer feedback viewer with average rating

### Technical Features
- 🔒 JWT authentication via Supabase Auth
- 🛡️ Row Level Security — users only see their own data
- 📱 Fully responsive (mobile + desktop)
- ⚡ Vite for fast development and builds
- 🎨 Framer Motion animations throughout
- 🌙 Dark theme with black and gold palette

---

## 🚀 How to Run

### Prerequisites
- Node.js 18+
- Supabase account (free tier)

### Setup

**1. Clone and install:**
```bash
# Backend
cd Project/server
npm install

# Frontend
cd Project/client
npm install
```

**2. Configure environment:**

`Project/server/.env`:
```
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key
```

`Project/client/.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

**3. Run Supabase SQL schema:**
Copy `Project/server/supabase_schema.sql` → Supabase SQL Editor → Run

**4. Seed menu data:**
```bash
cd Project/server
node seedMenu.js
```

**5. Create admin user:**
```bash
node createAdmin.js
# Email: admin@samridhii.com | Password: admin123
```

**6. Start servers:**
```bash
# Terminal 1
cd Project/server && node index.js

# Terminal 2
cd Project/client && npm run dev
```

**7. Open:** `http://localhost:3000`

---

## 🎨 Design System

| Element | Value |
|---|---|
| Primary Color | Gold `#d4af37` |
| Background | Black `#0f0f0f` |
| Secondary BG | Gray `#111827` |
| Font (Headings) | Playfair Display (serif) |
| Font (Body) | Poppins / system-ui |
| Border Radius | 0.75rem (cards), 1rem (modals) |
| Animation Library | Framer Motion |

---

*Built with ❤️ for Samridhii Restaurant*
