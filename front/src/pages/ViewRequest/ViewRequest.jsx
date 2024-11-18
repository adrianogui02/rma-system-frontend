import React, { useState, useEffect } from "react";
import RmaTable from "../../components/RmaTable";
import RmaDetailsModal from "../../components/RmaDetailsModal";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const getAuthToken = () => {
  return localStorage.getItem("token");
};

const ViewRmaRequests = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [modalDetails, setModalDetails] = useState(null);

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const token = getAuthToken();

        if (!token) {
          console.error("Token de autenticação não encontrado");
          return;
        }

        const response = await axios.get("http://localhost:8000/rma/rmas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSolicitacoes(response.data);
      } catch (err) {
        console.error("Erro ao carregar solicitações", err);
      }
    };

    fetchSolicitacoes();
  }, []);

  const handleViewDetails = (id) => {
    const solicitacao = solicitacoes.find((item) => item.id === id);
    setModalDetails(solicitacao);
  };

  const handleCloseModal = () => {
    setModalDetails(null);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Visualizar Solicitações de RMA</h1>
        <div className=" p-4">
          <RmaTable
            solicitacoes={solicitacoes}
            onViewDetails={handleViewDetails}
          />
        </div>
      </div>

      {modalDetails && (
        <RmaDetailsModal details={modalDetails} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ViewRmaRequests;
