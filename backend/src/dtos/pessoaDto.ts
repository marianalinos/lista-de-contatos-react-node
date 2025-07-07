export interface CreatePessoaDto {
    pessoa_nome: string;
    pessoa_cpf: string;
}
export interface UpdatePessoaDto {
    pessoa_id: number;
    pessoa_nome: string;
    pessoa_cpf: string;
}