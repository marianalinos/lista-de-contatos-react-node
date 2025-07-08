import {z} from "zod";

export const AuthSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").max(30, "Senha não pode ter mais de 30 caracteres"),
});

export type AuthDto = z.infer<typeof AuthSchema>;
