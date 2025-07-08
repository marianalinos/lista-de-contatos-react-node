import { PencilIcon, XCircleIcon, PlusIcon } from "@phosphor-icons/react";
import {
  createContato,
  deleteContato,
  getContatos,
  updateContato,
  type Contato,
} from "../api/contatos";
import { useEffect, useState } from "react";
import { GenericForm } from "../components/GenericForm";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPessoaById } from "../api/pessoas";

export default function ContatoPage() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContato, setEditingContato] = useState<Contato | null>(null);
  const { pessoaId } = useParams<{ pessoaId: string }>();
  const navigate = useNavigate();

  const loadContatos = async () => {
    const response = await getContatos(Number(pessoaId));
    setContatos(response);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteContato(id);
      await loadContatos();
    } catch (error) {
      console.error("Erro ao deletar contato:", error);
    }
  };

  useEffect(() => {
    async function start() {
      if (!pessoaId) {
        console.error("Pessoa ID não encontrado na URL.");
        return;
      }
      try {
        const pessoa = await getPessoaById(Number(pessoaId));
        if (!pessoa) {
          console.error("Pessoa não encontrada.");
          navigate(`/pessoas`);
        }
      } catch (error) {
        console.error("Erro ao buscar pessoa:", error);
        navigate(`/pessoas`);
      }
      loadContatos();
    }
    start();
  }, []);

  const formFields = [
    {
      name: "contato_tipo",
      label: "Tipo (email = true, telefone = false)",
      validate: (v: string) =>
        v !== "true" && v !== "false" ? "Deve ser true ou false" : null,
    },
    {
      name: "contato_descricao",
      label: "Descrição",
      placeholder: "Ex: email@exemplo.com ou 47999999999",
      validate: (v: string) =>
        v.trim() === "" ? "Descrição é obrigatória" : null,
    },
  ];

  const updateFormFields = [
    {
      name: "contato_id",
      label: "ID",
      props: { disabled: true },
    },
    ...formFields,
  ];

  const handleSubmitInsert = async (data: Record<string, string>) => {
    if (!pessoaId) {
      alert("Pessoa ID não encontrado na URL.");
      return;
    }

    await createContato({
      contato_tipo: data.contato_tipo == "true" ? true : false,
      contato_descricao: data.contato_descricao,
      contato_pessoa_id: Number(pessoaId),
    });

    setModalOpen(false);
    await loadContatos();
  };

  const handleSubmitUpdate = async (data: Record<string, string>) => {
    await updateContato(Number(data.contato_id), {
      contato_tipo: data.contato_tipo == "true" ? true : false,
      contato_descricao: data.contato_descricao,
      contato_pessoa_id: Number(pessoaId),
    });
    setEditingContato(null);
    await loadContatos();
  };

  // When opening new contact form, close editing form
  const openNewContactForm = () => {
    setEditingContato(null);
    setModalOpen(true);
  };

  // When editing a contact, close new contact form
  const openEditContactForm = (contato: Contato) => {
    setModalOpen(false);
    setEditingContato(contato);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Contatos</h1>
        <button
          onClick={openNewContactForm}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <PlusIcon size={20} />
          Novo
        </button>
      </div>

      <GenericForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitInsert}
        fields={formFields}
        title="Novo Contato"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded shadow-sm text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 border-b">Tipo</th>
              <th className="px-4 py-2 border-b">Descrição</th>
              <th className="px-4 py-2 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {contatos.map((contato) => {
              const isEditing =
                editingContato?.contato_id === contato.contato_id;
              return (
                <React.Fragment key={contato.contato_id}>
                  <tr className="hover:bg-gray-200">
                    <td className="px-4 py-2 border-b">
                      {contato.contato_tipo ? "Email" : "Telefone"}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {contato.contato_descricao}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <PencilIcon
                        size={20}
                        className="inline mr-2 text-blue-500 cursor-pointer"
                        onClick={() => openEditContactForm(contato)}
                      />
                      <XCircleIcon
                        size={20}
                        className="inline text-red-500 cursor-pointer"
                        onClick={() => handleDelete(contato.contato_id)}
                      />
                    </td>
                  </tr>

                  {isEditing && (
                    <tr>
                      <td colSpan={3} className="p-4 bg-gray-50">
                        <GenericForm
                          isOpen={true}
                          onClose={() => setEditingContato(null)}
                          onSubmit={handleSubmitUpdate}
                          fields={updateFormFields}
                          initialValues={{
                            contato_id: String(contato.contato_id),
                            contato_tipo: String(contato.contato_tipo),
                            contato_descricao: contato.contato_descricao,
                            contato_pessoa_id: String(
                              contato.contato_pessoa_id
                            ),
                          }}
                          title={`Editar Contato #${contato.contato_id}`}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

        {contatos.length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            Nenhum contato encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
