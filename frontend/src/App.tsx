import { Routes, Route } from "react-router-dom";
import ContatoPage from "./pages/Contato";
import PessoaPage from "./pages/Pessoa";
import { RequireAuth } from "./components/RequireAuth";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Running</h1>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/pessoas/:pessoaId/contatos"
        element={
          <RequireAuth>
            <ContatoPage />
          </RequireAuth>
        }
      />
      <Route
        path="/pessoas/"
        element={
          <RequireAuth>
            <PessoaPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
}

export default App;
