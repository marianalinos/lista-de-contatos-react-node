import { PrismaClient } from "@prisma/client";
import { ContatoModel } from "../models/contatoModel";
import { CreateContatoDto, UpdateContatoDto } from "../dtos/contatoDto";

export class ContatoRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async createContato(contatoData: CreateContatoDto): Promise<ContatoModel> {
    const contato = await this.prisma.contato.create({
      data: {
        contato_tipo: contatoData.contato_tipo,
        contato_descricao: contatoData.contato_descricao,
        contato_pessoa_id: contatoData.contato_pessoa_id,
      },
    });
    return new ContatoModel(
      contato.contato_id,
      contato.contato_tipo,
      contato.contato_descricao,
      contato.contato_pessoa_id
    );
  }

  public async updateContato(
    contatoId: number,
    contatoData: UpdateContatoDto
  ): Promise<ContatoModel> {
    const updatedContato = await this.prisma.contato.update({
      where: { contato_id: contatoId },
      data: {
        contato_tipo: contatoData.contato_tipo,
        contato_descricao: contatoData.contato_descricao,
        contato_pessoa_id: contatoData.contato_pessoa_id,
      },
    });
    return new ContatoModel(
      updatedContato.contato_id,
      updatedContato.contato_tipo,
      updatedContato.contato_descricao,
      updatedContato.contato_pessoa_id
    );
  }

  public async getContatoById(contatoId: number): Promise<ContatoModel | null> {
    const contato = await this.prisma.contato.findUnique({
      where: { contato_id: contatoId },
    });
    if (!contato) return null;
    return new ContatoModel(
      contato.contato_id,
      contato.contato_tipo,
      contato.contato_descricao,
      contato.contato_pessoa_id
    );
  }

  public async getAllContatos(): Promise<ContatoModel[]> {
    const contatos = await this.prisma.contato.findMany();
    return contatos.map(
      (c) =>
        new ContatoModel(
          c.contato_id,
          c.contato_tipo,
          c.contato_descricao,
          c.contato_pessoa_id
        )
    );
  }

  public async deleteContato(contatoId: number): Promise<void> {
    await this.prisma.contato.delete({
      where: { contato_id: contatoId },
    });
  }
}
