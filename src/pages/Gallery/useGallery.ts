import { useEffect, useState } from 'react';
import ApiService from '../../service/ApiService';
import { apiPaths } from '../../service/apiPaths';
import { IGallery } from './Gallery.props';

const useGallery = () => {
  const [selectedGallery, setSelectedGallery] = useState<IGallery | null>(null);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  const [galleryData, setGalleryData] = useState<IGallery[]>([]);
  const [defaultGalleryId, setDefaultGalleryId] = useState<string>("");
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false); // State to manage the visibility of the confirmation dialog
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const handleChangeGallery = (gallery: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGalleryId(gallery.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await ApiService({
        method: 'GET',
        endpoint: `${apiPaths.getAllGallery}`, 
      });
      console.log('response', response);
      setGalleryData(response);
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
        endpoint: `${apiPaths.deleteGallery}/${deletingId}`,
      });
      setGalleryData((prevData) => prevData.filter((gallery) => gallery._id !== deletingId));
    } catch (error : any) {
      alert(error)
      console.log(error)
      console.error('Error deleting gallery:', error);
    } finally{
      setLoading(false)
    }
    setShowConfirmation(false);
    setDeletingId(null);
  };;

  const handleView = (id: string) => {
    setSelectedGallery(galleryData.find((gallery) => gallery._id === id) || null);
  };

  const handleEdit = (id: string) => {
    setSelectedGalleryId(id);
  };

  const toggleAddGalleryModal = () => {
    setShowAddGalleryModal(!showAddGalleryModal);
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
    selectedGallery,
    selectedGalleryId,
    galleryData,
    defaultGalleryId,
    showAddGalleryModal,
    currentPage,
    showConfirmation,
    loading,
    handleClick,
    setDefaultGalleryId,
    handleChangeGallery,
    handleView,
    handleEdit,
    handleDelete,
    toggleAddGalleryModal,
    handlePageChange, 
    handleCancelDelete,
    handleConfirmDelete,
  };
};

export default useGallery;
