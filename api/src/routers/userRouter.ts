import { Router } from "express";
import * as UserController from "../controllers/userController";

const router = Router();

router.get("/users/:id", UserController.getUser);
router.get("/users", UserController.listUsers);
router.post("/users", UserController.createUser);
router.patch("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

export default router;
