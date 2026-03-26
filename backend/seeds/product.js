import "dotenv/config";
import { sql, initDB } from "../config/db.js";

const products = [
  {
    name: "Samoyed ",
    image:
      "https://images.unsplash.com/photo-1718420432340-3ae70488ebd5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Ftb3llZHxlbnwwfHwwfHx8MA%3D%3D",
    price: "649.99",
  },
  {
    name: "Norwegian Forest ",
    image:
      "https://images.unsplash.com/photo-1714504529280-61b72d6b4386?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bm9yd2VnaWFuJTIwZm9yZXN0JTIwY2F0fGVufDB8fDB8fHww",
    price: "349.99",
  },
  {
    name: "Siamese ",
    image:
      "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2lhbWVzZXxlbnwwfHwwfHx8MA%3D%3D",
    price: "149.99",
  },
  {
    name: "Caucasian ",
    image:
      "https://images.unsplash.com/photo-1617181815299-b24fd319f6b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F1Y2FzaWFuJTIwZG9nfGVufDB8fDB8fHww",
    price: "299.99",
  },

  {
    name: "Persian",
    image:
      "https://images.unsplash.com/photo-1591429939960-b7d5add10b5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc2lhbiUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D",
    price: "299.99",
  },
  {
    name: "Husky",
    image:
      "https://plus.unsplash.com/premium_photo-1667729435876-3a83af97f536?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aHVza3l8ZW58MHx8MHx8fDA%3D",
    price: "349.99",
  },
  {
    name: "Bengal",
    image:
      "https://images.unsplash.com/photo-1603277160434-df7471138363?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVuZ2FsJTIwY2F0fGVufDB8fDB8fHww",
    price: "399.99",
  },
  {
    name: "Mainne Coon",
    image:
      "https://images.unsplash.com/photo-1685271286659-c83faa4f5cb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFpbmUlMjBjb29ufGVufDB8fDB8fHww",
    price: "599.99",
  },
  {
    name: "Ragdoll",
    image:
      "https://images.unsplash.com/photo-1586289883499-f11d28aaf52f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFnZG9sbCUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D",
    price: "359.99",
  },
  {
    name: "Tibetan Mastiff",
    image:
      "https://images.unsplash.com/photo-1662673966019-862d4ee6f4c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGliZXRhbiUyMG1hc3RpZmZ8ZW58MHx8MHx8fDA%3D",
    price: "499.99",
  },
];

export const seedDatabase = async () => {
  try {
    // first, clear existing data
    await sql`TRUNCATE TABLE products RESTART IDENTITY`;

    // insert all products
    for (const product of products) {
      await sql`
      INSERT INTO products (name,price,image)
      VALUES (${product.name},${product.price},${product.image})
            
            `;
    }

    console.log("Database Seeded Successfully");
    // process.exit(0);
  } catch (err) {
    console.error("Error in deeding database:", err);
    process.exit(1);
  }
};

// seedDatabase();
