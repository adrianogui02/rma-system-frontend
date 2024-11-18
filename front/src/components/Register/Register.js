import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem!");
      return;
    }

    const newUser = {
      nome,
      email,
      role: "user",
      senha,
    };

    try {
      await axios.post("http://localhost:8000/auth/register", newUser);
      navigate("/login");
    } catch (error) {
      setError("Falha ao criar conta. Tente novamente.");
    }
  };

  return (
    <div className="container-fluid login-container">
      <div className="row">
        {/* Coluna com fundo azul */}
        <div className="col-md-6 login-background">
          <div className="d-flex justify-content-center align-items-center h-100">
            <h1 className="text-white">
              Cadastre-se no Sistema de Gerenciamento RMA
            </h1>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="login-form">
            <h2>Cadastro</h2>
            <form onSubmit={handleRegister}>
              {error && <div className="alert alert-danger">{error}</div>}
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
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="senha" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmarSenha" className="form-label">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmarSenha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Registrar
              </button>
            </form>

            <div className="mt-3 text-center">
              <p>Já tem uma conta?</p>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/login")}
              >
                Faça login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
