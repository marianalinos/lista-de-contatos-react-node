
import { z } from "zod";

export const CreateContatoSchema = z.object({
  contato_tipo: z.boolean(),
  contato_descricao: z.string(),
  contato_pessoa_id: z.number().int().positive(),
}).superRefine((data, ctx) => {
  const { contato_tipo, contato_descricao } = data;

  if (contato_descricao.length < 10 || contato_descricao.length > 100) {
    ctx.addIssue({
      path: ["contato_descricao"],
      message: "Descrição deve ter entre 10 e 100 caracteres",
      code: z.ZodIssueCode.custom,
    });
    return;
  }

  // Se contato_tipo for true, valida como email
  // Se contato_tipo for false, valida como telefone
  if (contato_tipo) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contato_descricao)) {
      ctx.addIssue({
        path: ["contato_descricao"],
        message: "Deve ser um email válido",
        code: z.ZodIssueCode.custom,
      });
    }
  } else {
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(contato_descricao)) {
      ctx.addIssue({
        path: ["contato_descricao"],
        message: "Deve ser um número de telefone válido (somente números, 10 a 15 dígitos)",
        code: z.ZodIssueCode.custom,
      });
    }
  }
});

export type CreateContatoDto = z.infer<typeof CreateContatoSchema>;
export type UpdateContatoDto = z.infer<typeof CreateContatoSchema>;