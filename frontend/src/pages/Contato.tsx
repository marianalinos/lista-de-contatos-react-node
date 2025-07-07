import { PencilIcon, XCircleIcon, PlusCircle } from "@phosphor-icons/react";
import { deleteContato, getContatos, type Contato } from "../api/contatos";
import { useEffect, useState } from "react";
import { GenericFormModal } from "../components/GenericFormModal";

export default function Contato() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContato, setEditingContato] = useState<Contato | null>(null);

  const loadContatos = async () => {
    const response = await getContatos();
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
    loadContatos();
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
    {
      name: "contato_pessoa_id",
      label: "Pessoa ID",
      validate: (v: string) =>
        /^\d+$/.test(v) ? null : "Deve ser um número inteiro",
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
    alert("Novo contato:\n" + JSON.stringify(data, null, 2));
    setModalOpen(false);
    await loadContatos();
  };

  const handleSubmitUpdate = async (data: Record<string, string>) => {
    alert("Atualizado:\n" + JSON.stringify(data, null, 2));
    setEditingContato(null);
    await loadContatos();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Contatos</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <PlusCircle size={20} />
          Novo
        </button>
      </div>

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
            {contatos.map((contato) => (
              <tr key={contato.contato_id} className="hover:bg-gray-50">
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
                    onClick={() => setEditingContato(contato)}
                  />
                  <XCircleIcon
                    size={20}
                    className="inline text-red-500 cursor-pointer"
                    onClick={() => handleDelete(contato.contato_id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {contatos.length === 0 && (
          <p className="text-gray-500 text-center mt-4">
            Nenhum contato encontrado.
          </p>
        )}
      </div>

      <GenericFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitInsert}
        fields={formFields}
        title="Novo Contato"
      />

      <GenericFormModal
        isOpen={!!editingContato}
        onClose={() => setEditingContato(null)}
        onSubmit={handleSubmitUpdate}
        fields={updateFormFields}
        initialValues={
          editingContato
            ? {
                contato_id: String(editingContato.contato_id),
                contato_tipo: String(editingContato.contato_tipo),
                contato_descricao: editingContato.contato_descricao,
                contato_pessoa_id: String(editingContato.contato_pessoa_id),
              }
            : {}
        }
        title="Editar Contato"
      />
    </div>
  );
}
