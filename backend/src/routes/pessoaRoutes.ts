import express from "express";
import { PrismaClient } from "@prisma/client";
import { PessoaRepository } from "../repositories/pessoaRepository";
import { PessoaController } from "../controllers/pessoaController";

const router = express.Router();

const repository = new PessoaRepository(new PrismaClient());
const controller = new PessoaController(repository);

router.post("/", (req, res) => controller.create(req, res));
router.put("/:id", (req, res) => controller.update(req, res));
router.get("/:id", (req, res) => controller.findById(req, res));
router.get("/", async (req, res) => controller.findAll(req, res));
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;
