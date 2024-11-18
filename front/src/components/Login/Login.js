import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email,
        senha,
      });
      const { access_token, user } = response.data;

      login(access_token, user);

      navigate("/dashboard");
    } catch (error) {
      setError("Falha ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="container-fluid login-container">
      <div className="row">
        <div className="col-md-6 login-background">
          <div className="d-flex justify-content-center align-items-center h-100">
            <h1 className="text-white">
              Bem-vindo ao Sistema de Gerenciamento RMA
            </h1>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              {error && <div className="alert alert-danger">{error}</div>}
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
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={senha}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>

            <div className="mt-3 text-center">
              <p>Ainda não tem uma conta?</p>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/register")}
              >
                Cadastre-se
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
