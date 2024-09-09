import { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import { apiPaths } from '../../service/apiPaths';
import { useNavigate } from 'react-router-dom';

const useGallery = () => {
  const [GalleryData, setGalleryData] = useState<any[]>([]);
  const [selectedGalleryView, setSelectedGalleryView] = useState<string | null>(null);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await ApiService({
        method: 'GET',
        endpoint: apiPaths.getAllGallery,
      });
      setGalleryData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatDateToISODateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const handleDateFilter = async (fromDate: Date, toDate: Date) => {
    const formattedFromDate = formatDateToISODateString(fromDate);
    const formattedToDate = formatDateToISODateString(toDate);

    try {
      const result = await ApiService({
        method: 'GET',
        endpoint: `${apiPaths.getAllGallery}?fromDate=${formattedFromDate}&toDate=${formattedToDate}`,
      });
      setGalleryData(result);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };
  const handleConfirmStatusUp = async () => {
    try {
      await ApiService({
        method: 'DELETE',
        endpoint: `${apiPaths.updateGallery}/${deletingId}`,
      });
      
      setGalleryData((prevData) => 
        prevData.map((gallery) => 
          gallery.GalleryId === deletingId ? 
                { ...gallery, status: gallery?.status?.toString() === "ACTIVE" ? "INACTIVE" : "ACTIVE" } 
                : gallery
        )
    );
    await fetchData(); 
    } catch (error) {
      console.error('Error deleting dealer:', error);
    }
    setShowConfirmation(false);
    setDeletingId(null);
  };
  const handleStatusUp = async (id: string, currentStatus: boolean) => {
    setLoading(true);
    setDeletingId(id);
    setShowConfirmation(true);
    const newStatus = currentStatus;
    console.log(newStatus)
    try {
      await ApiService({
        method: 'PUT',
        endpoint: `${apiPaths.updateGallery}/${id}`,
        data: { isActive: newStatus },
      });
      setGalleryData(prevData =>
        prevData.map(gallery =>
          gallery._id === id ? { ...gallery, isActive: newStatus } : gallery
        )
      );
    } catch (error) {
      console.error('Error updating injection status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate('/addgallery')
  }

  const handleView = (id: string) => {
    setSelectedGalleryView(id);
  };
  const handleCancelStatusUp = () => {
    setShowConfirmation(false);
    setDeletingId(null);
  };
  const handleEdit = (id: string) => {
    setSelectedGalleryId(id);
  };


  return {
    selectedGalleryView,
    selectedGalleryId,
    GalleryData,
    showConfirmation,
    loading,
    handleView,
    handleEdit,
    handleStatusUp,
    handleCancelStatusUp,
    handleConfirmStatusUp,
    handleDateFilter,
    handleAdd
  };
};

export default useGallery;
