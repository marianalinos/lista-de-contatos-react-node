import { PrismaClient } from "@prisma/client";
import { PessoaModel } from "../models/pessoaModel";
import { CreatePessoaDto, UpdatePessoaDto } from "../dtos/pessoaDto";

export class PessoaRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async createPessoa(pessoaData: CreatePessoaDto): Promise<PessoaModel> {
        const pessoa = await this.prisma.pessoa.create({
            data: {
                pessoa_cpf: pessoaData.pessoa_cpf,
            },
        });
        return new PessoaModel(pessoa.pessoa_id, pessoa.pessoa_cpf);
    }

    public async updatePessoa(pessoaId: number, pessoaData: UpdatePessoaDto): Promise<PessoaModel> {
        const updatedPessoa = await this.prisma.pessoa.update({
            where: { pessoa_id: pessoaId },
            data: {
                pessoa_cpf: pessoaData.pessoa_cpf,
            },
        });
        return new PessoaModel(updatedPessoa.pessoa_id, updatedPessoa.pessoa_cpf);
    }

    public async getPessoaById(pessoaId: number): Promise<PessoaModel | null> {
        const pessoa = await this.prisma.pessoa.findUnique({
            where: { pessoa_id: pessoaId },
        });
        if (!pessoa) return null;
        return new PessoaModel(pessoa.pessoa_id, pessoa.pessoa_cpf);
    }
    
    public async getAllPessoas(): Promise<PessoaModel[]> {
        const pessoas = await this.prisma.pessoa.findMany();
        return pessoas.map((p: { pessoa_id: number; pessoa_cpf: string }) => new PessoaModel(p.pessoa_id, p.pessoa_cpf));
    }   

    public async deletePessoa(pessoaId: number): Promise<void> {
        await this.prisma.pessoa.delete({
            where: { pessoa_id: pessoaId },
        });
    }
}
