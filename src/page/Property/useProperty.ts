import { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import { apiPaths } from '../../service/apiPaths';
import { useNavigate } from 'react-router-dom';

const useProperty = () => {
  const [PropertyData, setPropertyData] = useState<any[]>([]);
  const [selectedPropertyView, setSelectedPropertyView] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
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
        endpoint: apiPaths.getAllProperties,
      });
      setPropertyData(result);
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
        endpoint: `${apiPaths.getAllProperties}?fromDate=${formattedFromDate}&toDate=${formattedToDate}`,
      });
      setPropertyData(result);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };
  const handleConfirmStatusUp = async () => {
    try {
      await ApiService({
        method: 'DELETE',
        endpoint: `${apiPaths.updateProperty}/${deletingId}`,
      });
      
      setPropertyData((prevData) => 
        prevData.map((property) => 
          property.PropertyId === deletingId ? 
                { ...property, status: property?.status?.toString() === "ACTIVE" ? "INACTIVE" : "ACTIVE" } 
                : property
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
        endpoint: `${apiPaths.updateProperty}/${id}`,
        data: { isActive: newStatus },
      });
      setPropertyData(prevData =>
        prevData.map(property =>
          property._id === id ? { ...property, isActive: newStatus } : property
        )
      );
    } catch (error) {
      console.error('Error updating injection status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate('/addproperty')
  }

  const handleView = (id: string) => {
    setSelectedPropertyView(id);
  };
  const handleCancelStatusUp = () => {
    setShowConfirmation(false);
    setDeletingId(null);
  };
  const handleEdit = (id: string) => {
    setSelectedPropertyId(id);
  };


  return {
    selectedPropertyView,
    selectedPropertyId,
    PropertyData,
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

export default useProperty;
