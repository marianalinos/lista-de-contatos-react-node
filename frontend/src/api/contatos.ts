import axios from "axios";
import type { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:5000";

export type Contato = {
    contato_id: number;
    contato_tipo: "email" | "telefone";
    contato_descricao: string;
    contato_pessoa_id: number;
}

export async function getContatos() {
    const response: AxiosResponse<Contato[]> = await axios.get(
        `${API_BASE_URL}/contatos`
    );
    return response.data;
}