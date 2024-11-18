import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const token = getAuthToken();

        if (!token) {
          setError("Você precisa estar autenticado.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:8000/produto", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(response.data);
      } catch (error) {
        setError("Falha ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="container mt-5">
      {loading && (
        <div className="text-center">
          <p>Carregando...</p>
        </div>
      )}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row">
        {products.length === 0 && !loading && !error ? (
          <div className="col-12 text-center">
            <p>Não há produtos disponíveis.</p>
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-header">
                  <strong>ID:</strong> {product.id}
                </div>
                <div className="card-body">
                  <h5 className="card-text">
                    <strong>Produto:</strong> <span>{product.nome}</span>
                  </h5>
                  <p className="card-text">
                    <strong>Descrição:</strong> <span>{product.descricao}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
