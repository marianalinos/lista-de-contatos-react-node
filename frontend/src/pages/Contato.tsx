import { getContatos, type Contato } from "../api/contatos";
import { useEffect, useState } from "react";

export default function Contato() {
  const [contatos, setContatos] = useState<Contato[]>([]);

useEffect(() => {
  getContatos().then((response) => {
    console.log("Resposta da API:", response);
    setContatos(response);
  });
}, []);


  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contatos</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded shadow-sm text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 border-b">Tipo</th>
              <th className="px-4 py-2 border-b">Descrição</th>
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
    </div>
  );
}
