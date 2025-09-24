const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const role = req.query.role || "User";
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = { checkRole };
//nivel 5