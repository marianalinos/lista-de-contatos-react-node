import { Request, Response } from "express";
import { PessoaRepository } from "../repositories/pessoaRepository";
import { CreatePessoaDto, UpdatePessoaDto } from "../dtos/pessoaDto";
import { AbstractController } from "./abstractController";

export class PessoaController extends AbstractController {
  constructor(private pessoaRepository: PessoaRepository) {
    super();
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const pessoaData: CreatePessoaDto = req.body;
      const novaPessoa = await this.pessoaRepository.createPessoa(pessoaData);
      res.status(201).json(novaPessoa);
    } catch {
      this.internalError(res, "criar pessoa");
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const pessoaId = Number(req.params.id);
      if (!(await this.pessoaExists(pessoaId, res))) return;

      const pessoaData: UpdatePessoaDto = req.body;
      const updatedPessoa = await this.pessoaRepository.updatePessoa(
        pessoaId,
        pessoaData
      );
      res.json(updatedPessoa);
    } catch {
      this.internalError(res, "atualizar pessoa");
    }
  };

  public findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const pessoaId = Number(req.params.id);
      const pessoa = await this.pessoaRepository.getPessoaById(pessoaId);
      if (!pessoa) {
        res.status(404).json({ error: "Pessoa não encontrada" });
        return;
      }
      res.json(pessoa);
    } catch {
      this.internalError(res, "buscar pessoa");
    }
  };

  public findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const pessoas = await this.pessoaRepository.getAllPessoas();
      res.json(pessoas);
    } catch {
      this.internalError(res, "buscar pessoas");
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const pessoaId = Number(req.params.id);
      if (!(await this.pessoaExists(pessoaId, res))) return;

      await this.pessoaRepository.deletePessoa(pessoaId);
      res.sendStatus(204);
    } catch {
      this.internalError(res, "deletar pessoa");
    }
  };

  private async pessoaExists(pessoaId: number, res: Response): Promise<boolean> {
    const pessoa = await this.pessoaRepository.getPessoaById(pessoaId);
    if (!pessoa) {
      res.status(404).json({ error: "Pessoa não encontrada" });
      return false;
    }
    return true;
  }

}
