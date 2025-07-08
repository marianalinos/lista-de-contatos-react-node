import { z } from "zod";

export const CreatePessoaSchema = z.object({
  pessoa_nome: z.string().min(1, "Nome é obrigatório").max(100, "Nome não pode ter mais de 100 caracteres"),
  pessoa_cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato 000.000.000-00"),
});

export type CreatePessoaDto = z.infer<typeof CreatePessoaSchema>;
export type UpdatePessoaDto = z.infer<typeof CreatePessoaSchema>;