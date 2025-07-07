export class ContatoModel {
    private contato_id: number;
    private contato_tipo: boolean;
    private contato_descricao: string;
    private contato_pessoa_id: number;

    constructor(contato_id: number, contato_tipo: boolean, contato_descricao: string, contato_pessoa_id: number) {
        this.contato_id = contato_id;
        this.contato_tipo = contato_tipo;
        this.contato_descricao = contato_descricao;
        this.contato_pessoa_id = contato_pessoa_id;
    }

    public getContatoId(): number {
        return this.contato_id;
    }

    public getContatoTipo(): boolean {
        return this.contato_tipo;
    }

    public getContatoDescricao(): string {
        return this.contato_descricao;
    }

    public getContatoPessoaId(): number {
        return this.contato_pessoa_id;
    }

}