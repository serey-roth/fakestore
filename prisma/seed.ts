import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
    await prisma.user.create({
        data: {
            username: "bob",
            email: "bob@bob.com",
            password: await bcrypt.hash("bobbob", 10),
        }
    })
    await prisma.$executeRaw`
    INSERT INTO product (title, description, price, category, imageURL)
    VALUES 
    ('iPhone 13 Pro Max', 'The latest iPhone model with advanced camera and 5G connectivity.', 1099.99, 'Electronics', 'https://dummyimage.com/400x400/660966/fff&text=iphone-13-pro-max.jpg'),
    ('Leather Messenger Bag', 'Stylish and practical leather bag with multiple compartments.', 159.99, 'Fashion', 'https://dummyimage.com/400x400/660966/fff&text=messenger-bag.jpg'),
    ('Gaming Laptop', 'High-performance laptop with dedicated graphics for immersive gaming.', 1499.99, 'Electronics', 'https://dummyimage.com/400x400/660966/fff&text=gaming-laptop.jpg'),
    ('Organic Coffee', 'Gourmet coffee made from organic, fair-trade beans.', 14.99, 'Food & Drink', 'https://dummyimage.com/400x400/660966/fff&text=organic-coffee.jpg'),
    ('Yoga Mat', 'Thick and durable yoga mat with non-slip surface.', 49.99, 'Sports', 'https://dummyimage.com/400x400/660966/fff&text=yoga-mat.jpg'),
    ('Smart Thermostat', "A Wi-Fi enabled thermostat that lets you control your home\'s temperature from your smartphone.", 149.99, 'Home', 'https://dummyimage.com/400x400/465913/fff&text=thermostat.jpg'),
    ("Men\'s Leather Dress Shoes", 'Handcrafted leather dress shoes for men, perfect for formal occasions.', 199.99, 'Fashion', 'https://dummyimage.com/400x400/465913/fff&text=dress-shoes.jpg'),
    ('Wireless Headphones', 'Bluetooth headphones with noise cancellation and 20-hour battery life.', 99.99, 'Electronics', 'https://dummyimage.com/400x400/465913/fff&text=wireless-headphones.jpg'),
    ('Organic Granola', 'A delicious and nutritious blend of oats, nuts, and dried fruits, made with organic ingredients.', 9.99, 'Food & Drink', 'https://dummyimage.com/400x400/465913/fff&text=organic-granola.jpg'),
    ('Yoga Pants', 'Comfortable and stylish yoga pants with moisture-wicking fabric.', 34.99, 'Sports', 'https://dummyimage.com/400x400/465913/fff&text=yoga-pants.jpg'),
    ('Electric Toothbrush', 'A high-tech toothbrush that uses sonic vibrations to clean teeth more effectively.', 79.99, 'Health', 'https://dummyimage.com/400x400/465913/fff&text=electric-toothbrush.jpg'),
    ('Portable Bluetooth Speaker', 'A compact and powerful speaker that lets you stream music wirelessly from your phone or tablet.', 69.99, 'Electronics', 'https://dummyimage.com/400x400/c1c9ab/fff&text=bluetooth-speaker.jpg'),
    ("Women\'s Running Shoes", 'Lightweight and breathable running shoes for women, with excellent grip and support.', 89.99, 'Sports', 'https://dummyimage.com/400x400/c1c9ab/fff&text=running-shoes.jpg'),
    ('Stainless Steel Water Bottle', 'Durable and eco-friendly water bottle that keeps your drink cold for up to 24 hours.', 24.99, 'Home', 'https://dummyimage.com/400x400/c1c9ab/fff&text=water-bottle.jpg');
    `;
}

seed();
