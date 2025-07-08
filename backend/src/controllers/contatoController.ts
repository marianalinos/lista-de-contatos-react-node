import { Request, Response } from "express";
import { ContatoRepository } from "../repositories/contatoRepository";
import { CreateContatoDto, UpdateContatoDto } from "../dtos/contatoDto";
import { PessoaRepository } from "../repositories/pessoaRepository";
import { AbstractController } from "./abstractController";

export class ContatoController extends AbstractController {
  constructor(
    private contatoRepository: ContatoRepository,
    private pessoaRepository: PessoaRepository
  ) {
    super();
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const contatoData: CreateContatoDto = req.body;

      if (!(await this.pessoaExists(contatoData.contato_pessoa_id, res)))
        return;

      const novoContato = await this.contatoRepository.createContato(
        contatoData
      );
      res.status(201).json(novoContato);
    } catch {
      this.internalError(res, "criar contato");
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const contatoId = Number(req.params.id);
      const contatoData: UpdateContatoDto = req.body;

      if (!(await this.contatoExists(contatoId, res))) return;
      if (!(await this.pessoaExists(contatoData.contato_pessoa_id, res)))
        return;

      const updatedContato = await this.contatoRepository.updateContato(
        contatoId,
        contatoData
      );
      res.json(updatedContato);
    } catch {
      this.internalError(res, "atualizar contato");
    }
  };

  public findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const contatoId = Number(req.params.id);

      const contato = await this.contatoRepository.getContatoById(contatoId);
      if (!contato) {
        res.status(404).json({ error: "Contato não encontrado" });
        return;
      }

      res.json(contato);
    } catch {
      this.internalError(res, "buscar contato");
    }
  };

  public findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const pessoaId = req.query.pessoa_id
        ? Number(req.query.pessoa_id)
        : undefined;

      const contatos = await this.contatoRepository.getAllContatos(pessoaId);
      res.json(contatos);
    } catch {
      this.internalError(res, "buscar contatos");
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const contatoId = Number(req.params.id);

      if (!(await this.contatoExists(contatoId, res))) return;

      await this.contatoRepository.deleteContato(contatoId);
      res.sendStatus(204);
    } catch {
      this.internalError(res, "deletar contato");
    }
  };

  private async pessoaExists(
    pessoaId: number,
    res: Response
  ): Promise<boolean> {
    const pessoa = await this.pessoaRepository.getPessoaById(pessoaId);
    if (!pessoa) {
      res.status(404).json({ error: "Pessoa não encontrada" });
      return false;
    }
    return true;
  }

  private async contatoExists(
    contatoId: number,
    res: Response
  ): Promise<boolean> {
    const contato = await this.contatoRepository.getContatoById(contatoId);
    if (!contato) {
      res.status(404).json({ error: "Contato não encontrado" });
      return false;
    }
    return true;
  }
}
