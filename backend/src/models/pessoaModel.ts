export class PessoaModel {
    private pessoa_id: number;
    private pessoa_nome: string;
    private pessoa_cpf: string;

    constructor(pessoa_id: number, pessoa_nome: string, pessoa_cpf: string) {
        this.pessoa_id = pessoa_id;
        this.pessoa_nome = pessoa_nome;
        this.pessoa_cpf = pessoa_cpf;
    }

    public getPessoaId(): number {
        return this.pessoa_id;
    }

    public getPessoaNome(): string {
        return this.pessoa_nome;
    }

    public getPessoaCpf(): string {
        return this.pessoa_cpf;
    }
}