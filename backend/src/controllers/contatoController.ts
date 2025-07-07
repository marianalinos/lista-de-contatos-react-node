import { Request, Response } from "express";
import { ContatoService } from "../services/contatoService";
import { ContatoRepository } from "../repositories/contatoRepository";
import { CreateContatoDto, UpdateContatoDto } from "../dtos/contatoDto";

export class ContatoController {
  private contatoService: ContatoService;

  constructor(contatoRepository: ContatoRepository) {
    this.contatoService = new ContatoService(contatoRepository);
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const contatoData: CreateContatoDto = req.body;
      const novoContato = await this.contatoService.createContato(contatoData);
      res.status(201).json(novoContato);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Erro ao criar contato" });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const contatoId = parseInt(req.params.id);
      const contatoData: UpdateContatoDto = req.body;
      const updatedContato = await this.contatoService.updateContato(contatoId, contatoData);
      res.json(updatedContato);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar contato" });
    }
  }

  public async findById(req: Request, res: Response): Promise<void> {
    try {
      const contatoId = parseInt(req.params.id);
      const contato = await this.contatoService.getContatoById(contatoId);
      if (!contato) {
        res.status(404).json({ error: "Contato não encontrado" });
        return;
      }
      res.json(contato);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar contato" });
    }
  }

  public async findAll(req: Request, res: Response): Promise<void> {
    try {
      const contatos = await this.contatoService.getAllContatos();
      res.json(contatos);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar contatos" });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const contatoId = parseInt(req.params.id);
      await this.contatoService.deleteContato(contatoId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar contato" });
    }
  }
}
