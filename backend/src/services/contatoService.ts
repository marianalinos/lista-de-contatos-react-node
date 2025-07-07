import { ContatoRepository } from "../repositories/contatoRepository";
import { ContatoModel } from "../models/contatoModel";
import { CreateContatoDto, UpdateContatoDto } from "../dtos/contatoDto";

export class ContatoService {
  private contatoRepository: ContatoRepository;

  constructor(contatoRepository: ContatoRepository) {
    this.contatoRepository = contatoRepository;
  }

  public async createContato(contatoData: CreateContatoDto): Promise<ContatoModel> {
    return await this.contatoRepository.createContato(contatoData);
  }

  public async updateContato(
    contatoId: number,
    contatoData: UpdateContatoDto
  ): Promise<ContatoModel> {
    return await this.contatoRepository.updateContato(contatoId, contatoData);
  }

  public async getContatoById(contatoId: number): Promise<ContatoModel | null> {
    return await this.contatoRepository.getContatoById(contatoId);
  }

  public async getAllContatos(pessoaId?: number): Promise<ContatoModel[]> {
    return await this.contatoRepository.getAllContatos(pessoaId);
  }

  public async deleteContato(contatoId: number): Promise<void> {
    await this.contatoRepository.deleteContato(contatoId);
  }
}
