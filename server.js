const express = require("express");
const app = express();
const PORT = 3000;

const cars = [
  { id: 1, name: "Toyota Corolla", pricePerDay: 30 },
  { id: 2, name: "Honda Civic", pricePerDay: 35 }
];


app.get("/list", (req, res) => {
  res.json(cars);
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


app.get("/details/:id", (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ message: "Car not found" });
  res.json(car);
});
