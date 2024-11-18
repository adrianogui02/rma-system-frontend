import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const EditStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [solicitacao, setSolicitacao] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolicitacao = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/rma/rmas/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSolicitacao(response.data);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Erro ao carregar a solicitação:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitacao();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/rma/rmas/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/rma/edit");
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
    }
  };

  if (loading) {
    return <p>Carregando solicitação...</p>;
  }

  return (
    <div className="edit-status-page">
      <Navbar />
      <div className="content-container">
        <h1>Editar Status da Solicitação</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pendente">Pendente</option>
              <option value="em andamento">Em andamento</option>
              <option value="concluído">Concluído</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Atualizar Status
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStatus;
