import express from "express";

const app = express();

// Check package.json scripts
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
