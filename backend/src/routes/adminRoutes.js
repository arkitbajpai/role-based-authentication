import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  protectRoute,
  adminOnly,
  (req, res) => {
    res.status(200).json({
      message: "Welcome Admin",
      user: req.user
    });
  }
);

export default router;
