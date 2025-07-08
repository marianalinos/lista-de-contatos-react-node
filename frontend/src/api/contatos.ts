import type { AxiosResponse } from "axios";
import { privateApi } from "./axiosInstance"; 

export type Contato = {
  contato_id: number;
  contato_tipo: boolean;
  contato_descricao: string;
  contato_pessoa_id: number;
};

export async function getContatos(pessoa_id?: number): Promise<Contato[]> {
  const response: AxiosResponse<Contato[]> = await privateApi.get("/contatos", {
    params: { pessoa_id },
  });
  return response.data;
}

export async function createContato(contato: Omit<Contato, "contato_id">) {
  const response: AxiosResponse<Contato> = await privateApi.post("/contatos", contato);
  return response.data;
}

export async function updateContato(
  id: number,
  contato: Omit<Contato, "contato_id">
) {
  const response: AxiosResponse<Contato> = await privateApi.put(`/contatos/${id}`, contato);
  return response.data;
}

export async function deleteContato(id: number) {
  const response: AxiosResponse<void> = await privateApi.delete(`/contatos/${id}`);
  return response.data;
}
