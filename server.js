const express = require("express");
const app = express();
const PORT = 3000;

// Middleware pentru body JSON
app.use(express.json());

// Import routes
const carRoutes = require("./routes/cars");
app.use("/cars", carRoutes);

// Import middleware
const { checkRole } = require("./middleware/auth");

// Date statice exemplu
const cars = [
  { id: 1, name: "Toyota Corolla", pricePerDay: 30 },
  { id: 2, name: "Honda Civic", pricePerDay: 35 }
];

// Endpoint list
app.get("/list", (req, res) => res.json(cars));

// Endpoint details/:id
app.get("/details/:id", (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ message: "Car not found" });
  res.json(car);
});


app.put("/admin/edit/:id", checkRole(["Admin"]), (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ message: "Car not found" });

  const { name, pricePerDay } = req.body;
  if (name) car.name = name;
  if (pricePerDay) car.pricePerDay = pricePerDay;

  res.json({ message: "Car updated", car });
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
