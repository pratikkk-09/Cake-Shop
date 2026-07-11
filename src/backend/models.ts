import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  addresses: [{
    street: String,
    city: String,
    state: String,
    zipCode: String,
    isDefault: Boolean
  }]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String }
}, { timestamps: true });

export const Category = mongoose.model('Category', categorySchema);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  weightOptions: [{ type: String }], // e.g., '500g', '1kg', '1.5kg', '2kg'
  flavourOptions: [{ type: String }],
  shapeOptions: [{ type: String }],
  egglessAvailable: { type: Boolean, default: true },
  preparationTime: { type: String, default: '24 hours' },
  stock: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  hasOffer: { type: Boolean, default: false }
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  weight: { type: String, required: true },
  flavour: { type: String, required: true },
  shape: { type: String, required: true },
  isEggless: { type: Boolean, default: false },
  image: { type: String }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Accepted', 'Preparing', 'Ready for Pickup', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  pickupDate: { type: Date, required: true },
  pickupTime: { type: String, required: true },
  paymentMethod: { type: String, enum: ['COD', 'UPI'], required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  transactionId: { type: String }, // For UPI
  specialInstructions: { type: String }
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);
