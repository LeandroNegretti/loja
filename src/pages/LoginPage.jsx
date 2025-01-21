import { useState } from "react";
import { toast } from "react-toastify";
import "./../styles/Auth.css";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/usuarios/login", {
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Login realizado com sucesso!");
        console.log(response.data);
      } else {
        toast.error("Erro ao realizar login. veifique suas credenciais.");
      }
    } catch (error) {
      console.error("Erro na requisição", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        <button type="submit" className="btn btn-primary">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;