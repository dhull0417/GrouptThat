import express from "express";
import response from "express/lib/response.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from the backend")
})

app.get("/test", (req, res) => {
  res.send("Hello from Test")
})

// Check package.json scripts
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
