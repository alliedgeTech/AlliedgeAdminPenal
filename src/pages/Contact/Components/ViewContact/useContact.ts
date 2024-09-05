import { useState } from "react";


const useViewContact = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.reload()
  };

  return { isModalOpen, handleCloseModal };
};

export default useViewContact;