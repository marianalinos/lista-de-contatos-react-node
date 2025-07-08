import { Response } from "express";

export abstract class AbstractController {
  protected internalError(res: Response, action: string): void {
    res.status(500).json({ error: `Erro ao ${action}` });
  }
}
