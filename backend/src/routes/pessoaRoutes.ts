import express from "express";
import { PrismaClient } from "@prisma/client";
import { PessoaRepository } from "../repositories/pessoaRepository";
import { PessoaController } from "../controllers/pessoaController";
import { validateRequestMiddleware } from "../middlewares/validateRequestMiddleware";
import { CreatePessoaSchema } from "../dtos/pessoaDto";
import { IdParamSchema } from "../dtos/baseDto";
import { jwtMiddleware } from "../middlewares/jwtMiddleware";

const router = express.Router();

const repository = new PessoaRepository(new PrismaClient());
const controller = new PessoaController(repository);

router.post(
  "/",
  jwtMiddleware,
  validateRequestMiddleware(CreatePessoaSchema, "body"),
  controller.create
);

router.put(
  "/:id",
  jwtMiddleware,
  validateRequestMiddleware(IdParamSchema, "params"),
  validateRequestMiddleware(CreatePessoaSchema, "body"),
  controller.update
);

router.get(
  "/:id",
  jwtMiddleware,
  validateRequestMiddleware(IdParamSchema, "params"),
  (req, res) => controller.findById(req, res)
);
router.get("/", (req, res) => controller.findAll(req, res));
router.delete(
  "/:id",
  jwtMiddleware,
  validateRequestMiddleware(IdParamSchema, "params"),
  (req, res) => controller.delete(req, res)
);

export default router;
