import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
        const response = await api.getProdutos();
        setProdutos(response.data);
    } catch (error) {
        toast.error("Erro ao carregar produtos!", error);
    }
  };

  const excluirProduto = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
        try {
            await api.deleteProduto(id);
            toast.success("Produto excluído com sucesso");
            carregarProdutos();
        } catch (error) {
            toast.error("Erro ao excluir produto!", error);
        }
    }
  };

  return (
    <div className="container">
    <h2>Lista de Produtos</h2>
    <Link to="/produto/novo" className="btn btn-primary mb-3">
      Adicionar Produto
    </Link>
    <table className="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <tr key={produto.id}>
            <td>{produto.nome}</td>
            <td>{produto.categoria}</td>
            <td>R$ {produto.preco}</td>
            <td>
              <Link to={`/produto/editar/${produto.id}`} className="btn btn-warning btn-sm me-2">
                Editar
              </Link>
              <button onClick={() => excluirProduto(produto.id)} className="btn btn-danger btn-sm">
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
};

export default Produtos;