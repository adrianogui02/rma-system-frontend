import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard";
import ProdutoPage from "./pages/Produto/ProdutoPage";
import HomePage from "./pages/Home/HomePage";
import CreateRmaRequest from "./pages/CreateRequest/CreateRequest";
import ViewRmaRequests from "./pages/ViewRequest/ViewRequest";
import EditRequest from "./pages/EditRequest/EditRequest";
import EditStatus from "./pages/EditStatus/EditStatus";
import Rma from "./pages/Rma/RmaPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProdutoPage />} />
          <Route path="/rma" element={<Rma />} />
          <Route path="/rma/view" element={<ViewRmaRequests />} />
          <Route path="/rma/create" element={<CreateRmaRequest />} />
          <Route path="/rma/edit" element={<EditRequest />} />
          <Route path="/rma/edit/:id" element={<EditStatus />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
