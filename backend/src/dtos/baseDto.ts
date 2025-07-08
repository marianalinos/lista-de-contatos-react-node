import { z } from "zod";

export const IdParamSchema = z.object({
  id: z.coerce.number().int().positive("ID deve ser um número inteiro positivo"),
});