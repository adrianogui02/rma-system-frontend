import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const EditRequest = () => {
  const navigate = useNavigate();
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/rma/rmas", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSolicitacoes(response.data);
      } catch (error) {
        console.error("Erro ao carregar solicitações:", error);
      }
    };

    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/produto", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    fetchSolicitacoes();
    fetchProdutos();
    setLoading(false);
  }, []);

  const handleEditClick = (id) => {
    navigate(`/rma/edit/${id}`);
  };

  if (loading) {
    return <p>Carregando solicitações...</p>;
  }

  const produtoMap = produtos.reduce((map, produto) => {
    map[produto.id] = produto.nome;
    return map;
  }, {});

  return (
    <div className="request-page">
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Editar Solicitações de RMA</h1>

        <div className="row">
          {solicitacoes.length === 0 ? (
            <p className="text-center">Não há solicitações pendentes.</p>
          ) : (
            solicitacoes.map((solicitacao) => (
              <div key={solicitacao.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card">
                  <div className="card-header">
                    {`Solicitação ID: ${solicitacao.id}`}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      Produto:{" "}
                      {produtoMap[solicitacao.produto_id] ||
                        "Produto não encontrado"}
                    </h5>
                    <p className="card-text">
                      <strong>Status:</strong> {solicitacao.status}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(solicitacao.id)}
                    >
                      Editar Status
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EditRequest;
