import React, { useEffect, useState } from "react";
import axios from "axios";

const RmaTable = ({ solicitacoes, onViewDetails }) => {
  const [produtos, setProdutos] = useState({});

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const token = getAuthToken();

        if (!token) {
          console.error("Você precisa estar autenticado.");
          return;
        }

        const response = await axios.get("http://localhost:8000/produto", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const produtosMap = response.data.reduce((map, produto) => {
          map[produto.id] = produto.nome;
          return map;
        }, {});
        setProdutos(produtosMap);
        console.log("Produtos carregados:", produtosMap);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div className="container mt-4">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Produto</th>
            <th>Motivo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {solicitacoes.map((solicitacao) => (
            <tr key={solicitacao.id}>
              <td>
                {produtos[solicitacao.produto_id]
                  ? produtos[solicitacao.produto_id]
                  : "Produto não encontrado"}
              </td>
              <td>{solicitacao.motivo}</td>
              <td>{solicitacao.status}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => onViewDetails(solicitacao.id)}
                >
                  Ver Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RmaTable;
