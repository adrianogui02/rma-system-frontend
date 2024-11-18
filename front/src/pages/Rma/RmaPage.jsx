import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Rma = () => {
  const navigate = useNavigate();

  const handleCreateRmaClick = () => {
    navigate("/rma/create");
  };

  const handleViewRmasClick = () => {
    navigate("/rma/view");
  };

  const handleEditRmaClick = () => {
    navigate(`/rma/edit`);
  };

  return (
    <div className="rma-page">
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Gestão de Solicitações de RMA</h1>
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm" onClick={handleCreateRmaClick}>
              <div className="card-body text-center">
                <h5 className="card-title">Criar Solicitação de RMA</h5>
                <p className="card-text">
                  Clique aqui para criar uma nova solicitação de RMA.
                </p>
                <button className="btn btn-primary">Criar</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm" onClick={handleViewRmasClick}>
              <div className="card-body text-center">
                <h5 className="card-title">Visualizar Solicitações de RMA</h5>
                <p className="card-text">
                  Clique aqui para visualizar as solicitações registradas.
                </p>
                <button className="btn btn-primary">Visualizar</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm" onClick={handleEditRmaClick}>
              <div className="card-body text-center">
                <h5 className="card-title">Editar Solicitação de RMA</h5>
                <p className="card-text">
                  Clique aqui para editar uma solicitação de RMA.
                </p>
                <button className="btn btn-primary">Editar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rma;
