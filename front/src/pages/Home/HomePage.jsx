import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import logo from "../../assets/logo.png";

import { FaShoppingCart, FaClipboardList, FaRegClock } from "react-icons/fa";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "200px" }}
          />
        </div>
        <h1 className="text-center mb-4">Bem-vindo à nossa Plataforma!</h1>
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <FaClipboardList size={50} color="#007bff" />
                <h5 className="card-title mt-3">Painel de Supervisão</h5>
                <p className="card-text">
                  Supervisores podem acessar um painel com indicadores de status
                  e informações detalhadas sobre as solicitações de RMA.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <FaRegClock size={50} color="#28a745" />
                <h5 className="card-title mt-3">Registrar Solicitação</h5>
                <p className="card-text">
                  Funcionários podem registrar novas solicitações de RMA para os
                  produtos que necessitam de devolução ou reparo.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <FaShoppingCart size={50} color="#ffc107" />
                <h5 className="card-title mt-3">Status de Reparos</h5>
                <p className="card-text">
                  Acompanhe o status do reparo e da devolução dos produtos,
                  desde a solicitação até a resolução final.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
