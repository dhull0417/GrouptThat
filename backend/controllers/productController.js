import {sql} from "../config/db.js"

// Async functions
// CRUD Operations

export const getProducts = async (req, res) => {
    try {
        const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `;
        // If request is sucessful, respond with success message and the requested data
        console.log("fetched products", products);
        res.status(200).json({success:true, data:products});
    } catch (error) {
        console.log("Error in getProducts function", error);
        res.status(500).json({success:false, message: "internal server error"});
    }
}

export const createProduct = async (req, res) => {
    // Line below is dependent on app.use(express.json()); from server.js/
    // That allows us to destructure the name, price, image values from req.body (otherwise the name, price, and image variables would be undefined)
    const {name, price, image} = req.body;

    if(!name || !price || !image) {
        return res.status(400).json ({success:false, message: "All fields are required"});
    }

    try {
        // Place variables in the same order as defined above
        const newProduct = await sql `
            NSERT INTO products (name, price, image)
            VALUES (${name}, ${price}, ${image})
            RETURNING * 
        `;
            
        // 200 means success; 201 means resource added
        res.status(201).json({success: true, data: newProduct[0]});

    } catch (error) {
        console.log("Error in createProduct function", error);
        res.status(500).json({success:false, message: "internal server error"});
    }
}

export const getProduct = async (req, res) => {
    // the id value below is a reference to the router.get("/:id", getProduct) route in productRoutes.js
    const { id } = req.params;

    try {
        const product = await sql`
            SELECT * FROM products WHERE id=${id}
        `
        res.status(200).json({success: true, data: product[0]})
    } catch (error) {
        console.log("Error in getProduct function", error)
        res.status(500).json({success:false, message: "internal server error"})
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const { name, price, image } = req.body;

    try {
        const updateProduct = await sql `
            UPDATE products
            SET name =${name}, price=${price}, image=${image}
            WHERE id=${id}
            RETURNING *
        `
        if (updateProduct.length === 0) {
            req.status(404).json ({
                success: false,
                message: "Product not found"});
        }

        res.status(200).json({success: true, data: updateProduct[0]});
        
    } catch (error) {
        console.log("Error in updateProduct function", error);
        res.status(500).json({success:false, message: "internal server error"});
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedProduct = await sql`
            DELETE FROM products
            WHERE id=${id}
            RETURNING *
        `;
        
        if (deletedProduct.length === 0) {
            return res.status(404).json ({
                success: false,
                message: "Product not found"
            })
        }

        res.status(200).json({success: true, data: deletedProduct});

    } catch (error) {
        console.log("Error in deleteProduct function", error);
        res.status(500).json({success:false, message: "internal server error"});
    }
}