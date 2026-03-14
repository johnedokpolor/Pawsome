import { sql } from "../config/db.js";

const createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    res
      .status(400)
      .json({ success: false, message: "All fields are required!" });
  }
  try {
    //  Inserts the values into the product table and returns the added values
    const product = await sql`
    INSERT INTO products (name,price,image)
    VALUES (${name},${price},${image})
    RETURNING *
    `;
    res.status(201).json({ success: true, product: product[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getAllProducts = async (req, res) => {
  try {
    // Selects all columns from the product table and order from latest to oldest
    const products = await sql`
    SELECT * FROM products
    ORDER BY created_at DESC
    `;
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Selects all products where the id in params is equal to the product
    const product = await sql`
    SELECT * FROM products WHERE id=${id}
    `;
    if (product.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    res.status(201).json({
      success: true,
      product: product[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  try {
    // Update products where id is same and return the product
    const product = await sql`
    UPDATE products 
    SET name=${name},price=${price},image=${image}
    WHERE id=${id}
    RETURNING *
    `;
    if (product.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }
    res.status(201).json({ success: true, product: product[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await sql`
    DELETE FROM products WHERE id=${id}
    RETURNING *
    `;
    if (product.length === 0) {
      if (product.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export {
  getAllProducts,
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct,
};
