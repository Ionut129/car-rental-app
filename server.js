const express = require("express");
const app = express();
const PORT = 3000;

const cars = [
  { id: 1, name: "Toyota Corolla", pricePerDay: 30 },
  { id: 2, name: "Honda Civic", pricePerDay: 35 }
];

// Endpoint corect
app.get("/list", (req, res) => {
  res.json(cars);
});

// Pornire server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
