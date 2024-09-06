import { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import { apiPaths } from '../../service/apiPaths';
import { useNavigate } from 'react-router-dom';

const useLife = () => {
  const [LifeData, setLifeData] = useState<any[]>([]);
  const [selectedLifeView, setSelectedLifeView] = useState<string | null>(null);
  const [selectedLifeId, setSelectedLifeId] = useState<string | null>(null);
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
        endpoint: apiPaths.getAllLife,
      });
      setLifeData(result);
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
        endpoint: `${apiPaths.getAllLife}?fromDate=${formattedFromDate}&toDate=${formattedToDate}`,
      });
      setLifeData(result);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };
  const handleConfirmStatusUp = async () => {
    try {
      await ApiService({
        method: 'DELETE',
        endpoint: `${apiPaths.updateLife}/${deletingId}`,
      });
      
      setLifeData((prevData) => 
        prevData.map((life) => 
          life.LifeId === deletingId ? 
                { ...life, status: life?.status?.toString() === "ACTIVE" ? "INACTIVE" : "ACTIVE" } 
                : life
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
        endpoint: `${apiPaths.updateLife}/${id}`,
        data: { isActive: newStatus },
      });
      setLifeData(prevData =>
        prevData.map(life =>
          life._id === id ? { ...life, isActive: newStatus } : life
        )
      );
    } catch (error) {
      console.error('Error updating injection status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate('/addlife')
  }

  const handleView = (id: string) => {
    setSelectedLifeView(id);
  };
  const handleCancelStatusUp = () => {
    setShowConfirmation(false);
    setDeletingId(null);
  };
  const handleEdit = (id: string) => {
    setSelectedLifeId(id);
  };


  return {
    selectedLifeView,
    selectedLifeId,
    LifeData,
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

export default useLife;
