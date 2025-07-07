import express from "express";
import { PrismaClient } from "@prisma/client";
import { ContatoRepository } from "../repositories/contatoRepository";
import { ContatoController } from "../controllers/contatoController";

const router = express.Router();

const repository = new ContatoRepository(new PrismaClient());
const controller = new ContatoController(repository);

router.post("/", (req, res) => controller.create(req, res));
router.put("/:id", (req, res) => controller.update(req, res));
router.get("/:id", (req, res) => controller.findById(req, res));
router.get("/", async (req, res) => controller.findAll(req, res));
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;
