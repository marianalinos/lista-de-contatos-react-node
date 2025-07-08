import express from "express";
import { PrismaClient } from "@prisma/client";
import { ContatoRepository } from "../repositories/contatoRepository";
import { ContatoController } from "../controllers/contatoController";
import { validateRequest } from "../middlewares/validateRequest";
import { CreateContatoSchema } from "../dtos/contatoDto";
import { IdParamSchema } from "../dtos/baseDto";

const router = express.Router();

const repository = new ContatoRepository(new PrismaClient());
const controller = new ContatoController(repository);

router.post("/", validateRequest(CreateContatoSchema, "body"), (req, res) =>
  controller.create(req, res)
);
router.put(
  "/:id",
  validateRequest(IdParamSchema, "params"),
  validateRequest(CreateContatoSchema, "body"),
  (req, res) => controller.update(req, res)
);
router.get("/:id", validateRequest(IdParamSchema, "params"), (req, res) =>
  controller.findById(req, res)
);
router.get("/", async (req, res) => controller.findAll(req, res));
router.delete("/:id", validateRequest(IdParamSchema, "params"), (req, res) =>
  controller.delete(req, res)
);

export default router;
