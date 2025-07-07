import axios from "axios";
import type { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export type Contato = {
  contato_id: number;
  contato_tipo: boolean;
  contato_descricao: string;
  contato_pessoa_id: number;
};

export async function getContatos(pessoa_id?: number): Promise<Contato[]> {
  const response: AxiosResponse<Contato[]> = await axios.get(
    `${API_BASE_URL}/contatos`,
    {
      params: {
        pessoa_id,
      },
    }
  );
  return response.data;
}

export async function createContato(contato: Omit<Contato, "contato_id">) {
  const response: AxiosResponse<Contato> = await axios.post(
    `${API_BASE_URL}/contatos`,
    contato
  );
  return response.data;
}

export async function updateContato(
  id: number,
  contato: Omit<Contato, "contato_id">
) {
  const response: AxiosResponse<Contato> = await axios.put(
    `${API_BASE_URL}/contatos/${id}`,
    contato
  );
  return response.data;
}

export async function deleteContato(id: number) {
  const response: AxiosResponse<void> = await axios.delete(
    `${API_BASE_URL}/contatos/${id}`
  );
  return response.data;
}
