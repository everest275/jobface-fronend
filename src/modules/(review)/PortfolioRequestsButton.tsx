import { useState } from "react";
import Modal from "../../components/Modal"; 
import RequestsPage from './PortfolioRequestsPage'

interface RequestsButtonProps {
    id: string;
  }
  
  const RequestsButton: React.FC<RequestsButtonProps> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal} className="w-40 tracking-wide py-1 px-2 bg-zinc-800 text-white transition ease-in duration-200 text-center font-semibold shadow-md hover:bg-zinc-700 rounded-md flex gap-2 justify-center items-center content-center h-9">
       Ver solicitudes
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <RequestsPage id={id}/>
        </div>
      </Modal>
    </div>
  );
};

export default RequestsButton;
