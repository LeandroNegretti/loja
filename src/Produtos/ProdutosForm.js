import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const ProdutosForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    quantidadeEstoque: "",
    ume: "",
    categoria: "",
    imagem: "",
    status: true,
  });

  useEffect(() => {
    if (id !== "novo") {
      carregarProduto(id);
    }
  }, [id]);

  const carregarProduto = async (id) => {
    try {
        const response = await api.getProdutoById(id);
        setProduto(response.data);
    } catch (error) {
        toast.error("Erro ao carregar produto!", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (id === "novo") {
            await api.createProduto(produto);
            toast.success("Produto cadastrado com sucesso!");
        } else {
            await api.updateProduto(id, produto);
            toast.success("Produto atualizado com sucesso!");
        }
        navigate("/");
    } catch (error) {
        toast.error("Erro ao salvar produto!", error)
    }
  };

  return (
    <div className="container">
    <h2>{id === "novo" ? "Novo Produto" : "Editar Produto"}</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Nome</label>
        <input type="text" className="form-control" name="nome" value={produto.nome} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Descrição</label>
        <textarea className="form-control" name="descricao" value={produto.descricao} onChange={handleChange}></textarea>
      </div>
      <div className="mb-3">
        <label>Preço</label>
        <input type="number" className="form-control" name="preco" value={produto.preco} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Quantidade</label>
        <input type="number" className="form-control" name="quantidadeEstoque" value={produto.quantidadeEstoque} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>UME</label>
        <input type="text" className="form-control" name="ume" value={produto.ume} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Categoria</label>
        <input type="text" className="form-control" name="categoria" value={produto.categoria} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Imagem (URL)</label>
        <input type="text" className="form-control" name="imagem" value={produto.imagem} onChange={handleChange} />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" name="status" checked={produto.status} onChange={(e) => setProduto({ ...produto, status: e.target.checked })} />
        <label className="form-check-label">Ativo</label>
      </div>
      <button type="submit" className="btn btn-success">Salvar</button>
      <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/")}>Cancelar</button>
    </form>
  </div>
  );
};

export default ProdutosForm;