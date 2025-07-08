import { Request, Response } from "express";
import { ContatoRepository } from "../repositories/contatoRepository";
import { CreateContatoDto, UpdateContatoDto } from "../dtos/contatoDto";

export class ContatoController {

  constructor(private contatoRepository: ContatoRepository) {

  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const contatoData: CreateContatoDto = req.body;
      const novoContato = await this.contatoRepository.createContato(contatoData);
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
      const updatedContato = await this.contatoRepository.updateContato(contatoId, contatoData);
      res.json(updatedContato);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar contato" });
    }
  }

  public async findById(req: Request, res: Response): Promise<void> {
    try {
      const contatoId = parseInt(req.params.id);
      const contato = await this.contatoRepository.getContatoById(contatoId);
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
      const pessoaId = req.query.pessoa_id ? parseInt(req.query.pessoa_id as string) : undefined;
      const contatos = await this.contatoRepository.getAllContatos(pessoaId);
      res.json(contatos);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar contatos" });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const contatoId = parseInt(req.params.id);
      await this.contatoRepository.deleteContato(contatoId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar contato" });
    }
  }
}
