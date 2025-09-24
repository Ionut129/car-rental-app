const express = require("express");
const router = express.Router();

const cars = [
  { id: 1, name: "Toyota Corolla", pricePerDay: 30 },
  { id: 2, name: "Honda Civic", pricePerDay: 35 },
  { id: 3, name: "BMW 320", pricePerDay: 60 }
];

// /cars/list
router.get("/list", (req, res) => res.json(cars));

// /cars/details/:id
router.get("/details/:id", (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ message: "Car not found" });
  res.json(car);
});

module.exports = router;

// /cars/search?name=&minPrice=&maxPrice=
router.get("/search", (req, res) => {
  let results = cars;
  const { name, minPrice, maxPrice } = req.query;

  if (name) results = results.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
  if (minPrice) results = results.filter(c => c.pricePerDay >= parseFloat(minPrice));
  if (maxPrice) results = results.filter(c => c.pricePerDay <= parseFloat(maxPrice));

  res.json(results);
});
