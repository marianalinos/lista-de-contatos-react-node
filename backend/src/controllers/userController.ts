import e from "express";
import { AuthDto } from "../dtos/userDto";
import { UserRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
  private JWT_SECRET: string;

  constructor(private userRepository: UserRepository) {
      this.JWT_SECRET = String(process.env.JWT_SECRET);
  }

  public async register(req: any, res: any): Promise<void> {
    try {
      const userData: AuthDto = req.body;
      const existingUser = await this.userRepository.findUserByEmail(
        userData.email
      );
      if (existingUser) {
        res.status(400).json({ error: "Usuário já existe" });
        return;
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = await this.userRepository.createUser({
        ...userData,
        secret: hashedPassword,
      });

      res.status(201).json({ id: newUser.user_id, email: newUser.user_email });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao registrar usuário" });
    }
  }

  public async login(req: any, res: any): Promise<void> {
    try {
      const userData: AuthDto = req.body;
      const user = await this.userRepository.findUserByEmail(userData.email);
      if (!user) {
        res.status(401).json({ error: "Credenciais inválidas" });
        return;
      }

      const passwordMatches = await bcrypt.compare(
        userData.password,
        user.user_secret
      );
      if (!passwordMatches) {
        res.status(401).json({ error: "Credenciais inválidas" });
        return;
      }

      const token = jwt.sign({ id: user.user_id, email: user.user_email }, this.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ user: { id: user.user_id, email: user.user_email }, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  }
}
