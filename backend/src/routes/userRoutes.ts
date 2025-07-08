import express from "express";
import { PrismaClient } from "@prisma/client";
import { UserController } from "../controllers/userController";
import { UserRepository } from "../repositories/userRepository";
import { validateRequestMiddleware } from "../middlewares/validateRequestMiddleware";
import { AuthSchema } from "../dtos/userDto";

const router = express.Router();

const repository = new UserRepository(new PrismaClient());
const controller = new UserController(repository);

router.post("/register", validateRequestMiddleware(AuthSchema, "body"), (req, res) =>
  controller.register(req, res)
);
router.post("/login", validateRequestMiddleware(AuthSchema, "body"), (req, res) =>
  controller.login(req, res)
);

export default router;
