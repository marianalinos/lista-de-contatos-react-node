import { Routes, Route } from "react-router-dom";
import ContatoPage from "./pages/Contato";
import PessoaPage from "./pages/Pessoa";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello World</h1>} />
      <Route path="/pessoas/:pessoaId/contatos" element={<ContatoPage />} />
      <Route path="/pessoas/" element={<PessoaPage />} />
      <Route path="*" element={<h1>404 - Not Found</h1>} />
      <Route path="/unauthorized" element={<h1>401 - Unauthorized</h1>} />
      <Route path="/forbidden" element={<h1>403 - Forbidden</h1>} />
    </Routes>
  );
}

export default App;
