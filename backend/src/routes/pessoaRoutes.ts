import express from "express";
import { PrismaClient } from "@prisma/client";
import { PessoaRepository } from "../repositories/pessoaRepository";
import { PessoaController } from "../controllers/pessoaController";
import { validateRequest } from "../middlewares/validateRequest";
import { CreatePessoaSchema } from "../dtos/pessoaDto";
import { IdParamSchema } from "../dtos/baseDto";

const router = express.Router();

const repository = new PessoaRepository(new PrismaClient());
const controller = new PessoaController(repository);

router.post(
  "/",
  validateRequest(CreatePessoaSchema, "body"),
  controller.create
);

router.put(
  "/:id",
  validateRequest(IdParamSchema, "params"),
  validateRequest(CreatePessoaSchema, "body"),
  controller.update
);

router.get("/:id", validateRequest(IdParamSchema, "params"), (req, res) =>
  controller.findById(req, res)
);
router.get("/", (req, res) => controller.findAll(req, res));
router.delete("/:id", validateRequest(IdParamSchema, "params"), (req, res) =>
  controller.delete(req, res)
);

export default router;
