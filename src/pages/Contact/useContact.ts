import { useEffect, useState } from 'react';
import ApiService from '../../service/ApiService';
import { apiPaths } from '../../service/apiPaths';
import { IContact } from './Contact.props';

const useContact = () => {
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [contactData, setContactData] = useState<IContact[]>([]);
  const [selectedLatestNewsId, setSelectedLatestNewsId] = useState<string>("");
  const [defaultLatestNewsId, setDefaultLatestNewsId] = useState<string>("");
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false); // State to manage the visibility of the confirmation dialog
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const handleChangeLatestNews = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLatestNewsId(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await ApiService({
        method: 'GET',
        endpoint: `${apiPaths.getAllContact}`, 
      });
      console.log('response', response);
      setContactData(response.data);
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
        endpoint: `${apiPaths.deleteContact}/${deletingId}`,
      });
      setContactData((prevData) => prevData.filter((contact) => contact._id !== deletingId));
    } catch (error : any) {
      alert(error)
      console.log(error)
      console.error('Error deleting latestNews:', error);
    } finally{
      setLoading(false)
    }
    setShowConfirmation(false);
    setDeletingId(null);
  };;

  const handleView = (id: string) => {
    setSelectedContact(contactData.find((contact) => contact._id === id) || null);
  };

  const handleEdit = (id: string) => {
    setSelectedContactId(id);
  };

  const toggleAddContactModal = () => {
    setShowAddContactModal(!showAddContactModal);
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
    selectedContact,
    selectedContactId,
    selectedLatestNewsId,
    contactData,
    defaultLatestNewsId,
    showAddContactModal,
    currentPage,
    showConfirmation,
    loading,
    handleClick,
    setDefaultLatestNewsId,
    handleChangeLatestNews,
    handleView,
    handleEdit,
    handleDelete,
    toggleAddContactModal,
    handlePageChange, 
    handleCancelDelete,
    handleConfirmDelete,
  };
};

export default useContact;
