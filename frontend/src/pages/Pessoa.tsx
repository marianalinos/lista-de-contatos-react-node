import {
  PencilIcon,
  XCircleIcon,
  PlusIcon,
  EyeIcon,
} from "@phosphor-icons/react";
import {
  createPessoa,
  deletePessoa,
  getPessoas,
  updatePessoa,
  type Pessoa,
} from "../api/pessoas";
import { useEffect, useState } from "react";
import { GenericForm } from "../components/GenericForm";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PessoaPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPessoa, setEditingPessoa] = useState<Pessoa | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // <-- Search term state
  const navigate = useNavigate();

  const loadPessoas = async () => {
    const response = await getPessoas();
    setPessoas(response);
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePessoa(id);
      await loadPessoas();
    } catch (error) {
      console.error("Erro ao deletar pessoa:", error);
    }
  };

  useEffect(() => {
    loadPessoas();
  }, []);

  const formFields = [
    {
      name: "pessoa_nome",
      label: "Nome",
      validate: (v: string) => (v.trim() === "" ? "Nome é obrigatório" : null),
    },
    {
      name: "pessoa_cpf",
      label: "CPF",
      validate: (v: string) => {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return !cpfRegex.test(v.trim())
          ? "CPF deve estar no formato XXX.XXX.XXX-XX"
          : null;
      },
    },
  ];

  const updateFormFields = [
    {
      name: "pessoa_id",
      label: "ID",
      props: { disabled: true },
    },
    ...formFields,
  ];

  const handleSubmitInsert = async (data: Record<string, string>) => {
    await createPessoa({
      pessoa_nome: data.pessoa_nome,
      pessoa_cpf: data.pessoa_cpf,
    });

    setModalOpen(false);
    await loadPessoas();
  };

  const handleSubmitUpdate = async (data: Record<string, string>) => {
    await updatePessoa(Number(data.pessoa_id), {
      pessoa_nome: data.pessoa_nome,
      pessoa_cpf: data.pessoa_cpf,
    });
    setEditingPessoa(null);
    await loadPessoas();
  };

  const handleViewContatos = (pessoaId: number) => {
    navigate(`/pessoas/${pessoaId}/contatos`);
  };

  const openNewPessoaForm = () => {
    setEditingPessoa(null);
    setModalOpen(true);
  };

  const openEditPessoaForm = (pessoa: Pessoa) => {
    setModalOpen(false);
    setEditingPessoa(pessoa);
  };

  // Filter pessoas by nome using the searchTerm
  const filteredPessoas = pessoas.filter((pessoa) =>
    pessoa.pessoa_nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Pessoas</h1>
        <button
          onClick={openNewPessoaForm}
          className="flex items-center gap-1 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          <PlusIcon size={20} />
          Nova
        </button>
      </div>

      {/* Search input */}
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full px-3 py-2 border border-gray-300 rounded"
      />

      <GenericForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitInsert}
        fields={formFields}
        title="Nova Pessoa"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded shadow-sm text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 border-b">Nome</th>
              <th className="px-4 py-2 border-b">CPF</th>
              <th className="px-4 py-2 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredPessoas.map((pessoa) => {
              const isEditing = editingPessoa?.pessoa_id === pessoa.pessoa_id;
              return (
                <React.Fragment key={pessoa.pessoa_id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{pessoa.pessoa_nome}</td>
                    <td className="px-4 py-2 border-b">{pessoa.pessoa_cpf}</td>
                    <td className="px-4 py-2 border-b">
                      <PencilIcon
                        size={20}
                        className="inline mr-2 text-blue-500 cursor-pointer"
                        onClick={() => openEditPessoaForm(pessoa)}
                      />
                      <XCircleIcon
                        size={20}
                        className="inline mr-2 text-red-500 cursor-pointer"
                        onClick={() => handleDelete(pessoa.pessoa_id)}
                      />
                      <EyeIcon
                        size={20}
                        className="inline text-green-500 cursor-pointer"
                        onClick={() => handleViewContatos(pessoa.pessoa_id)}
                      />
                    </td>
                  </tr>

                  {isEditing && (
                    <tr>
                      <td colSpan={3} className="p-4 bg-gray-50">
                        <GenericForm
                          isOpen={true}
                          onClose={() => setEditingPessoa(null)}
                          onSubmit={handleSubmitUpdate}
                          fields={updateFormFields}
                          initialValues={{
                            pessoa_id: String(pessoa.pessoa_id),
                            pessoa_nome: pessoa.pessoa_nome,
                            pessoa_cpf: pessoa.pessoa_cpf,
                          }}
                          title={`Editar Pessoa #${pessoa.pessoa_id}`}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

        {filteredPessoas.length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            Nenhuma pessoa encontrada.
          </p>
        )}
      </div>
    </div>
  );
}
