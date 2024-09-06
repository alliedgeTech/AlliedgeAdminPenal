/* eslint-disable */
// All code here will not be checked by ESLint
import { useEffect, useState } from 'react';
import ApiService from '../../../../service/ApiService'; // Adjust the path accordingly
import { apiPaths } from '../../../../service/apiPaths';
import { IContact, IContactId } from '../../Contact.props';

const useEditContact = ({ ContactId }: IContactId) => {
  const [contact, setContact] = useState<IContact>({
    mobile: '',
    name: '',
    email: '',
    subject: '',
    message: '',
    _id: '',
    
  });
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await ApiService({
        method: 'GET',
        endpoint: `${apiPaths.getContact}/${ContactId}`,
      });
      setContact(response);
      populateFormData(response);
    } catch (error: any) {
      alert(error);
      console.log(error);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const populateFormData = (contactData: IContact) => {
    setContact({
      mobile: contactData.mobile,
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject,
      message: contactData.message,
      _id: ContactId,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    // const formData = new FormData();
    // formData.append('phone', contact.phone);
    // formData.append('id', contact._id);
    // if (pdfFile) {
    //   formData.append('name', pdfFile);
    // }

    try {
      const response = await ApiService({
        method: 'PUT',
        endpoint: `${apiPaths.updateContact}/${ContactId}`,
        data: {
          "mobile": contact.mobile,
          "name": pdfFile ? pdfFile : contact.name
        },
      });
      console.log(response);
      alert("Contact updated successfully.");
      // window.location.reload();
    } catch (error: any) {
      alert(error);
      console.log(error);
      console.error('Error updating Contact:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDrop = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setPdfFile(files[0]);
    }
  };

  const removePdf = () => {
    setPdfFile(null);
    setContact((prevState) => ({
      ...prevState,
      name: '',
    }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  return {
    contact,
    pdfFile,
    loading,
    removePdf,
    onDrop,
    handleChange,
    handleUpdate,
    handleCloseModal,
  };
};

export default useEditContact;
