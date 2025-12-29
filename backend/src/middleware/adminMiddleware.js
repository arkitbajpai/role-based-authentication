const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access denied sorry" });
  }
  next();
};

export default adminMiddleware;
