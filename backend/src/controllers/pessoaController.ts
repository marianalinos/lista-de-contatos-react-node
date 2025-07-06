import { Request, Response } from "express";
import { PessoaService } from "../services/pessoaService";
import { PessoaRepository } from "../repositories/pessoaRepository";
import { CreatePessoaDto, UpdatePessoaDto } from "../dtos/pessoaDto";

export class PessoaController {
    private pessoaService: PessoaService;

    constructor(pessoaRepository: PessoaRepository) {
        this.pessoaService = new PessoaService(pessoaRepository);
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const pessoaData: CreatePessoaDto = req.body;
            const novaPessoa = await this.pessoaService.createPessoa(pessoaData);
            res.status(201).json(novaPessoa);
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar pessoa" });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const pessoaId = parseInt(req.params.id);
            const pessoaData: UpdatePessoaDto = req.body;
            const updatedPessoa = await this.pessoaService.updatePessoa(pessoaId, pessoaData);
            res.json(updatedPessoa);
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar pessoa" });
        }
    }

    public async findById(req: Request, res: Response): Promise<void> {
        try {
            const pessoaId = parseInt(req.params.id);
            const pessoa = await this.pessoaService.getPessoaById(pessoaId);
            if (!pessoa) {
                res.status(404).json({ error: "Pessoa não encontrada" });
                return;
            }
            res.json(pessoa);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar pessoa" });
        }
    }

    public async findAll(req: Request, res: Response): Promise<void> {
        try {
            const pessoas = await this.pessoaService.getAllPessoas();
            res.json(pessoas);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar pessoas" });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const pessoaId = parseInt(req.params.id);
            await this.pessoaService.deletePessoa(pessoaId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar pessoa" });
        }
    }
}
