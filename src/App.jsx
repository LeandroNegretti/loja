import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/CadastroPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Importar os estilos do Toastify

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastrologin" element={<RegisterPage />} />
      </Routes>
      {/* Para que o toast seja exibido em todas as rotas*/}
      <ToastContainer />
    </Router>
  );
}

export default App;
