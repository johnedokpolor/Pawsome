import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

// Create a SQL connection to the Neon database
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`,
);

export const initDB = async () => {
  try {
    // Create products table if it doesn't exist
    // SERIAL is used to create an auto-incrementing integer column
    // VARCHAR is used to store variable-length strings
    // DECIMAL is used to store numbers with a fixed number of decimal places
    await sql`
            CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL, 
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL, 
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
        `;
    console.log("Database intialised successfully..");
  } catch (error) {
    console.log(error);
    console.log("Error connecting to Database");

    process.exit(1);
  }
};
