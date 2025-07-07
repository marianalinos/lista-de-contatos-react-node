import { PessoaRepository } from "../repositories/pessoaRepository";
import { PessoaModel } from "../models/pessoaModel";
import { CreatePessoaDto, UpdatePessoaDto } from "../dtos/pessoaDto";

export class PessoaService {
  private pessoaRepository: PessoaRepository;
  private cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

  constructor(pessoaRepository: PessoaRepository) {
    this.pessoaRepository = pessoaRepository;
  }

  public async createPessoa(pessoaData: CreatePessoaDto): Promise<PessoaModel> {
    if (!this.cpfRegex.test(pessoaData.pessoa_cpf)) {
      throw new Error(
        "O CPF precisa estar no formato padrão, com uso de pontos e traço (123.456.789-00)."
      );
    }

    return await this.pessoaRepository.createPessoa(pessoaData);
  }

  public async updatePessoa(
    pessoaId: number,
    pessoaData: UpdatePessoaDto
  ): Promise<PessoaModel> {
    if (!this.cpfRegex.test(pessoaData.pessoa_cpf)) {
      throw new Error(
        "O CPF precisa estar no formato padrão, com uso de pontos e traço (123.456.789-00)."
      );
    }
    return await this.pessoaRepository.updatePessoa(pessoaId, pessoaData);
  }

  public async getPessoaById(pessoaId: number): Promise<PessoaModel | null> {
    return await this.pessoaRepository.getPessoaById(pessoaId);
  }

  public async getAllPessoas(): Promise<PessoaModel[]> {
    return await this.pessoaRepository.getAllPessoas();
  }

  public async deletePessoa(pessoaId: number): Promise<void> {
    await this.pessoaRepository.deletePessoa(pessoaId);
  }
}
