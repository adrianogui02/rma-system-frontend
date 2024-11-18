import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "./Navbar/Navbar";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { jsPDF } from "jspdf";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [produtos, setProdutos] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.role !== "admin") {
      setIsAdmin(false);
      return;
    }

    setIsAdmin(true);
  }, [user]);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const produtosResponse = await axios.get(
          "http://localhost:8000/produto/all/get",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const solicitacoesResponse = await axios.get(
          "http://localhost:8000/rma/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProdutos(produtosResponse.data);
        setSolicitacoes(solicitacoesResponse.data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin]);

  if (!user || user.role !== "admin") {
    return <Navigate to="/products" />;
  }

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  const processRequestDataByDate = () => {
    const groupedData = solicitacoes.reduce((acc, solicitacao) => {
      const date = new Date(solicitacao.data_solicitacao);
      if (isNaN(date.getTime())) {
        console.error("Data inválida:", solicitacao.data_solicitacao);
        return acc;
      }
      const formattedDate = date.toLocaleDateString();
      acc[formattedDate] = (acc[formattedDate] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData);

    return {
      labels,
      datasets: [
        {
          label: "Solicitações Criadas por Dia",
          data,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const processRequestStatusData = () => {
    const labels = solicitacoes.map((solicitacao) => solicitacao.status);
    const data = solicitacoes.reduce((acc, solicitacao) => {
      acc[solicitacao.status] = (acc[solicitacao.status] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(data),
      datasets: [
        {
          label: "Solicitações por Status",
          data: Object.values(data),
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  // Função para gerar o PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Adiciona o título
    doc.setFontSize(18);
    doc.text("Dashboard de Administração", 14, 20);

    // Adiciona os totais de produtos e solicitações
    doc.setFontSize(12);
    doc.text(`Total de Produtos: ${produtos.length}`, 14, 30);
    doc.text(`Total de Solicitações: ${solicitacoes.length}`, 14, 40);

    // Adiciona os gráficos (aqui vamos gerar as imagens dos gráficos em base64)
    doc.addPage();

    doc.text("Solicitações Criadas por Dia", 14, 20);
    const chartData = processRequestDataByDate();
    const chartImage = document.querySelector("canvas"); // A referência ao gráfico de barras
    if (chartImage) {
      doc.addImage(chartImage, "PNG", 14, 30, 180, 120); // Adiciona o gráfico gerado
    }

    doc.save("dashboard.pdf");
  };

  return (
    <div>
      <Navbar />
      <div className="text-center">
        <h1>Dashboard</h1>
        <p>Bem-vindo ao painel de administração!</p>
      </div>

      <div className="container mt-4">
        {/* Barra de contagem */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="alert alert-info">
              <strong>Total de Produtos:</strong> {produtos.length}
            </div>
          </div>
          <div className="col-md-6">
            <div className="alert alert-info">
              <strong>Total de Solicitações:</strong> {solicitacoes.length}
            </div>
          </div>
        </div>

        {/* Botão Emitir PDF */}
        <div className="row mb-4">
          <div className="col-md-12">
            <button
              className="btn btn-primary"
              onClick={generatePDF} // Chama a função para gerar o PDF
            >
              Emitir PDF
            </button>
          </div>
        </div>

        {/* Gráficos */}
        <div className="row">
          <div className="col-md-6">
            <h3>Solicitações Criadas por Dia</h3>
            <Bar
              data={processRequestDataByDate()}
              options={{ responsive: true }}
            />
          </div>
          <div className="col-md-6">
            <h3>Solicitações por Status</h3>
            <Bar
              data={processRequestStatusData()}
              options={{ responsive: true }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
