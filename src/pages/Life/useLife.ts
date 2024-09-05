import { useEffect, useState } from 'react';
import ApiService from '../../service/ApiService';
import { apiPaths } from '../../service/apiPaths';
import { ILife } from './Life.props';

const useLife = () => {
  const [selectedLife, setSelectedLife] = useState<ILife | null>(null);
  const [selectedLifeId, setSelectedLifeId] = useState<string | null>(null);
  const [lifeData, setLifeData] = useState<ILife[]>([]);
  const [defaultLifeId, setDefaultLifeId] = useState<string>("");
  const [showAddLifeModal, setShowAddLifeModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false); // State to manage the visibility of the confirmation dialog
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const handleChangeLife = (life: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLifeId(life.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await ApiService({
        method: 'GET',
        endpoint: `${apiPaths.getAllLife}`, 
      });
      console.log('response', response);
      setLifeData(response);
    } catch (error : any) {
      alert(error);
      console.log(error);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false)
    }
  };

  const handleConfirmDelete = async () => {
    setLoading(true)
    try {
      await ApiService({
        method: 'DELETE',
        endpoint: `${apiPaths.deleteLife}/${deletingId}`,
      });
      setLifeData((prevData) => prevData.filter((life) => life._id !== deletingId));
    } catch (error : any) {
      alert(error)
      console.log(error)
      console.error('Error deleting life:', error);
    } finally{
      setLoading(false)
    }
    setShowConfirmation(false);
    setDeletingId(null);
  };;

  const handleView = (id: string) => {
    setSelectedLife(lifeData.find((life) => life._id === id) || null);
  };

  const handleEdit = (id: string) => {
    setSelectedLifeId(id);
  };

  const toggleAddLifeModal = () => {
    setShowAddLifeModal(!showAddLifeModal);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setShowConfirmation(true);
  };
  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeletingId(null);
  };
  const handleClick = async (action: () => Promise<void>) => {
    setLoading(true);
    try {
      await action();
    } finally {
      setLoading(false);
    }
  };
   
  return {
    selectedLife,
    selectedLifeId,
    lifeData,
    defaultLifeId,
    showAddLifeModal,
    currentPage,
    showConfirmation,
    loading,
    handleClick,
    setDefaultLifeId,
    handleChangeLife,
    handleView,
    handleEdit,
    handleDelete,
    toggleAddLifeModal,
    handlePageChange, 
    handleCancelDelete,
    handleConfirmDelete,
  };
};

export default useLife;
