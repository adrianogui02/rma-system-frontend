import React, { useState } from "react";
import axios from "axios";

const AddProductForm = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();

      if (!token) {
        setError("Você precisa estar autenticado.");
        return;
      }

      await axios.post(
        "http://localhost:8000/produto",
        { nome, descricao },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setNome("");
      setDescricao("");
      setError("");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.statusText ||
        "Erro ao adicionar produto";
      setError(errorMsg);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Adicionar Novo Produto</h2>
      {success && (
        <div className="alert alert-success">
          Produto adicionado com sucesso!
        </div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">
            Descrição
          </label>
          <textarea
            className="form-control"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Adicionar Produto
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
