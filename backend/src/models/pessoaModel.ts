export class PessoaModel {
    private pessoa_id: number;
    private pessoa_cpf: string;

    constructor(pessoa_id: number, pessoa_cpf: string) {
        this.pessoa_id = pessoa_id;
        this.pessoa_cpf = pessoa_cpf;
    }

    public getPessoaId(): number {
        return this.pessoa_id;
    }

    public getPessoaCpf(): string {
        return this.pessoa_cpf;
    }
}