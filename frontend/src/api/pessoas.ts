import axios from "axios";
import type { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export type Pessoa = {
  pessoa_id: number;
  pessoa_nome: string;
  pessoa_cpf: string;
};

export async function getPessoas(): Promise<Pessoa[]> {
  const response: AxiosResponse<Pessoa[]> = await axios.get(`${API_BASE_URL}/pessoas`);
  return response.data;
}

export async function createPessoa(pessoa: Omit<Pessoa, "pessoa_id">) {
    console.log("Creating pessoa:", pessoa);
  const response: AxiosResponse<Pessoa> = await axios.post(`${API_BASE_URL}/pessoas`, pessoa);
  return response.data;
}

export async function updatePessoa(id: number, pessoa: Omit<Pessoa, "pessoa_id">) {
  const response: AxiosResponse<Pessoa> = await axios.put(`${API_BASE_URL}/pessoas/${id}`, pessoa);
  return response.data;
}

export async function deletePessoa(id: number) {
  const response: AxiosResponse<void> = await axios.delete(`${API_BASE_URL}/pessoas/${id}`);
  return response.data;
}

export async function getPessoaById(id: number): Promise<Pessoa> {
  const response: AxiosResponse<Pessoa> = await axios.get(`${API_BASE_URL}/pessoas/${id}`);
  return response.data;
}