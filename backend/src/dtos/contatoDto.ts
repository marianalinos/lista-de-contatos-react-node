export interface CreateContatoDto {
    contato_tipo: boolean;
    contato_descricao: string;
    contato_pessoa_id: number;
}
export interface UpdateContatoDto {
    contato_id: number;
    contato_tipo: boolean;
    contato_descricao: string;
    contato_pessoa_id: number;
}