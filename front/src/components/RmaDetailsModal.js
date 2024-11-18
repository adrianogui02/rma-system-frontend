import React from "react";

const RmaDetailsModal = ({ details, onClose }) => {
  if (!details) return null;

  const produtoNome = details.produto
    ? details.produto.nome
    : "Produto não encontrado";
  const comentarios =
    details.comentarios && details.comentarios.length > 0 ? (
      details.comentarios.map((comentario, index) => (
        <li key={index}>{comentario}</li>
      ))
    ) : (
      <li>Sem comentários registrados.</li>
    );

  return (
    <div
      className="modal fade show"
      style={{ display: "block" }}
      role="dialog"
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detalhes da Solicitação</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Produto:</strong> {produtoNome}
            </p>
            <p>
              <strong>Motivo:</strong> {details.motivo || "Não informado"}
            </p>
            <p>
              <strong>Status Atual:</strong> {details.status || "Não informado"}
            </p>
            <p>
              <strong>Comentários:</strong>
            </p>
            <ul>{comentarios}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RmaDetailsModal;
