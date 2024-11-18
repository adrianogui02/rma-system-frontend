import React, { useState } from "react";
import ProductList from "../../components/ProductList/ProductList";
import ProductForm from "../../components/ProductForm/ProductForm";
import Navbar from "../../components/Navbar/Navbar";

const ProductsPage = () => {
  const [isAddProductFormVisible, setIsAddProductFormVisible] = useState(false);

  return (
    <div className="products-page">
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Gestão de Produtos</h1>
        <button
          className="btn btn-secondary mb-4 d-block mx-auto"
          onClick={() => setIsAddProductFormVisible(!isAddProductFormVisible)}
        >
          {isAddProductFormVisible ? "Ver Produtos" : "Adicionar Produto"}
        </button>

        {isAddProductFormVisible ? <ProductForm /> : <ProductList />}
      </div>
    </div>
  );
};

export default ProductsPage;
