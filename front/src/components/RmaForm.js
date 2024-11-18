import React, { useState, useEffect } from "react";
import axios from "axios";

const RmaForm = () => {
  const [produto_id, setProdutoId] = useState("");
  const [motivo, setMotivo] = useState("");
  const [status, setStatus] = useState("Pendente");
  const [produtos, setProdutos] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };
  const token = getAuthToken();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/produto", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProdutos(response.data);
      } catch (err) {
        console.error("Erro ao carregar os produtos", err);
        setError("Erro ao carregar produtos");
      }
    };

    fetchProdutos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        console.error("Você precisa estar autenticado.");
        return;
      }

      await axios.post(
        "http://localhost:8000/rma/rmas",
        { produto_id, motivo, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setProdutoId("");
      setMotivo("");
      setStatus("Pendente");
    } catch (error) {
      setError("Erro ao adicionar RMA");
    }
  };

  return (
    <div className="container mt-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto"
        style={{ maxWidth: "600px" }}
      >
        {success && (
          <div className="alert alert-success">
            Solicitação de RMA enviada com sucesso!
          </div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="produtoId" className="form-label">
            Produto
          </label>
          <select
            id="produtoId"
            className="form-control"
            value={produto_id}
            onChange={(e) => setProdutoId(e.target.value)}
            required
          >
            <option value="">Selecione um produto</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="motivo" className="form-label">
            Motivo
          </label>
          <textarea
            className="form-control"
            id="motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <input
            type="text"
            className="form-control"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            readOnly
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar Solicitação
        </button>
      </form>
    </div>
  );
};

export default RmaForm;
