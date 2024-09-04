import { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import { apiPaths } from '../../service/apiPaths';
import { useNavigate } from 'react-router-dom';
import { ILife } from './life.props'; // Import the ILife interface

const useLife = () => {
  const [lifeData, setLifeData] = useState<ILife[]>([]);
  const [selectedLifeView, setSelectedLifeView] = useState<string | null>(null);
  const [selectedLifeId, setSelectedLifeId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await ApiService({
        method: 'GET',
        endpoint: apiPaths.getlife,
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
        endpoint: `${apiPaths.getlife}?fromDate=${formattedFromDate}&toDate=${formattedToDate}`,
      });
      setLifeData(result as ILife[]);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

  const handleConfirmStatusUp = async () => {
    if (!deletingId) return;

    try {
      await ApiService({
        method: 'DELETE',
        endpoint: `${apiPaths.deletelife}/${deletingId}`,
      });

      setLifeData((prevData) =>
        prevData.map((life) =>
          life._id === deletingId
            ? { ...life, status: life.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
            : life
        )
      );
      await fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setShowConfirmation(false);
      setDeletingId(null);
    }
  };

  const handleStatusUp = async (id: string, currentStatus: boolean) => {
    setLoading(true);
    setDeletingId(id);
    setShowConfirmation(true);
    try {
      await ApiService({
        method: 'PUT',
        endpoint: `${apiPaths.updatelife}/${id}`,
        data: { isActive: !currentStatus },
      });
      setLifeData((prevData) =>
        prevData.map((life) =>
          life._id === id ? { ...life, isActive: !currentStatus } : life
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate('/addlife');
  };

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
    lifeData,
    showConfirmation,
    loading,
    handleView,
    handleEdit,
    handleStatusUp,
    handleCancelStatusUp,
    handleConfirmStatusUp,
    handleDateFilter,
    handleAdd,
  };
};

export default useLife;
