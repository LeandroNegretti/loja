import { useState } from "react";
import { toast } from "react-toastify";
import "./../styles/Auth.css";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/usuarios",
        {
          name: username,
          email,
          senha: password,
        }
      );

      if (response.data.sucess) {
        toast.sucess("Cadastro realizaso com sucesso!");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        toast.error(response.data.mensagem || "Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu nome de usuário"
            required
          />
        </div>
        <div className="input">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </div>
        <div className="input">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
