import { Request, Response } from 'express';
import { Product, Category, User } from './models';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export async function seedDatabase(req: Request, res: Response) {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    if (!isConnected) {
      res.status(503).json({ success: false, message: 'Database not connected' });
      return;
    }

    // Clear existing
    await Category.deleteMany({});
    await Product.deleteMany({});
    
    // Check Admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'pratikc0203@gmail.com';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin_password', 10);
      admin = await User.create({
        name: 'Pratik (Admin)',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
    }

    // Create Categories
    const categories = await Category.insertMany([
      { name: 'Birthday Cakes', slug: 'birthday' },
      { name: 'Wedding Cakes', slug: 'wedding' },
      { name: 'Anniversary Cakes', slug: 'anniversary' },
      { name: 'Theme Cakes', slug: 'theme' },
      { name: 'Kids Cakes', slug: 'kids' },
    ]);

    const bdayCat = categories.find(c => c.slug === 'birthday')?._id;
    const wedCat = categories.find(c => c.slug === 'wedding')?._id;

    // Create some products
    await Product.insertMany([
      {
        name: 'Classic Black Forest',
        slug: 'classic-black-forest',
        category: bdayCat,
        description: 'Delicious chocolate sponge layered with fresh cream and cherries.',
        images: ['/placeholder-cake.jpg'],
        price: 450,
        weightOptions: ['500g', '1kg', '1.5kg'],
        flavourOptions: ['Black Forest'],
        shapeOptions: ['Round', 'Square'],
        egglessAvailable: true,
        preparationTime: '2 hours',
        stock: 50,
        isAvailable: true,
        rating: 4.8,
        reviewsCount: 124,
        isFeatured: true,
      },
      {
        name: 'Red Velvet Love',
        slug: 'red-velvet-love',
        category: wedCat,
        description: 'Rich red velvet sponge with cream cheese frosting.',
        images: ['/placeholder-cake.jpg'],
        price: 600,
        weightOptions: ['500g', '1kg', '2kg'],
        flavourOptions: ['Red Velvet'],
        shapeOptions: ['Heart', 'Round'],
        egglessAvailable: true,
        preparationTime: '4 hours',
        stock: 30,
        isAvailable: true,
        rating: 4.9,
        reviewsCount: 89,
        isFeatured: true,
      },
      {
        name: 'Pineapple Delight',
        slug: 'pineapple-delight',
        category: bdayCat,
        description: 'Fresh vanilla sponge with juicy pineapple chunks and cream.',
        images: ['/placeholder-cake.jpg'],
        price: 400,
        weightOptions: ['500g', '1kg'],
        flavourOptions: ['Pineapple'],
        shapeOptions: ['Round'],
        egglessAvailable: true,
        preparationTime: '2 hours',
        stock: 45,
        isAvailable: true,
        rating: 4.5,
        reviewsCount: 65,
        isFeatured: false,
      }
    ]);

    res.json({ success: true, message: 'Database seeded successfully' });
  } catch (error: any) {
    console.error('Seed error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}
