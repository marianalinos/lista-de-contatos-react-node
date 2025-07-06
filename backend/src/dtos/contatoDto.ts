export interface CreateContatoDto {
    tipo: boolean;
    descricao: string;
    pessoa_id: number;
}
export interface UpdateContatoDto {
    id: number;
    tipo: boolean;
    descricao: string;
    pessoa_id: number;
}