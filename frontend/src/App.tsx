import { Routes, Route } from "react-router-dom";
import Contato from "./pages/Contato";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello World</h1>} />
      <Route path="/contatos" element={<Contato />} />
    </Routes>
  );
}

export default App;
