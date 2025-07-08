import { Request, Response } from "express";
import { AuthDto } from "../dtos/userDto";
import { UserRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AbstractController } from "./abstractController";

export class UserController extends AbstractController {
  private JWT_SECRET: string;

  constructor(private userRepository: UserRepository) {
    super();
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET não definido nas variáveis de ambiente");
    }
    this.JWT_SECRET = secret;
  }

  public register = async (req: Request, res: Response): Promise<void> => {
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

      res.status(201).json({
        id: newUser.user_id,
        email: newUser.user_email,
      });
    } catch {
      this.internalError(res, "registrar usuário");
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: AuthDto = req.body;

      const user = await this.userRepository.findUserByEmail(userData.email);
      if (
        !user ||
        !(await bcrypt.compare(userData.password, user.user_secret))
      ) {
        res.status(401).json({ error: "Credenciais inválidas" });
        return;
      }

      const token = jwt.sign(
        { id: user.user_id, email: user.user_email },
        this.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        user: {
          id: user.user_id,
          email: user.user_email,
        },
        token,
      });
    } catch {
      this.internalError(res, "fazer login");
    }
  };
}
