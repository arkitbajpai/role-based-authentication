import express from "express";
import protectRoute from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import { createUserByAdmin,getAllUsers,
  deleteUserByAdmin as deleteUser,
  changeUserRole} from "../controllers/adminController.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  protectRoute,
  adminOnly,
  (req, res) => {
    res.status(200).json({
      message: "Welcome Admin yeah!",
      user: req.user
    });
  }
);
router.post(
  "/create-user",
  authMiddleware,
  adminMiddleware,
  createUserByAdmin
);
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);
router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUser
);
router.patch(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  changeUserRole
);




export default router;
