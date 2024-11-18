import RmaForm from "../../components/RmaForm";
import Navbar from "../../components/Navbar/Navbar";

const CreateRmaRequest = () => {
  return (
    <div className="request-page">
      <Navbar />
      <div className="content-container">
        <h1 className="mb-4 text-center">Criar Solicitação de RMA</h1>
        <RmaForm onSubmit={() => {}} />
      </div>
    </div>
  );
};

export default CreateRmaRequest;
