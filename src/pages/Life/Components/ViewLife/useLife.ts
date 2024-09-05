import { useState } from "react";


const useViewLife = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.reload()
  };

  return { isModalOpen, handleCloseModal };
};

export default useViewLife;