
# Database Schema Documentation

## Collections

### 1. Users Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed, min 6 chars),
  phone: String,
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

### 2. MenuItems Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  category: String (required, enum: ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Specials']),
  image: String (URL or path),
  isAvailable: Boolean (default: true),
  isVegetarian: Boolean (default: false),
  spiceLevel: String (enum: ['Mild', 'Medium', 'Hot', 'Extra Hot', 'None'], default: 'None'),
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Bookings Collection

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  name: String (required),
  email: String (required),
  phone: String (required),
  date: Date (required),
  time: String (required),
  guests: Number (required, min: 1, max: 20),
  specialRequests: String,
  status: String (enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Orders Collection

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  items: [{
    menuItem: ObjectId (ref: 'MenuItem', required),
    quantity: Number (required, min: 1),
    price: Number (required)
  }],
  totalAmount: Number (required),
  status: String (enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'], default: 'pending'),
  deliveryAddress: String,
  orderType: String (enum: ['dine-in', 'takeaway', 'delivery'], default: 'dine-in'),
  createdAt: Date,
  updatedAt: Date
}
```

## Relationships

- User → Bookings (One to Many)
- User → Orders (One to Many)
- MenuItem → Orders.items (Many to Many through embedded array)

## Indexes

Recommended indexes for performance:

```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true })

// MenuItems
db.menuitems.createIndex({ category: 1 })
db.menuitems.createIndex({ isAvailable: 1 })

// Bookings
db.bookings.createIndex({ user: 1 })
db.bookings.createIndex({ date: 1 })
db.bookings.createIndex({ status: 1 })

// Orders
db.orders.createIndex({ user: 1 })
db.orders.createIndex({ status: 1 })
db.orders.createIndex({ createdAt: -1 })
```
