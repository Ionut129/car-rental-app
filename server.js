const express = require("express");
const app = express();
const PORT = 3000;
const carRoutes = require("./routes/cars");
app.use("/cars", carRoutes);
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
// Exemplu simplificat Admin
app.put("/admin/edit/:id", (req, res) => {
  const role = req.query.role || "User"; // în practică: JWT
  if (role !== "Admin") return res.status(403).json({ message: "Forbidden" });

  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) return res.status(404).json({ message: "Car not found" });

  const { name, pricePerDay } = req.body;
  if (name) car.name = name;
  if (pricePerDay) car.pricePerDay = pricePerDay;

  res.json({ message: "Car updated", car });
});

