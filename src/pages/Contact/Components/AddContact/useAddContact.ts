/* eslint-disable */
// All code here will not be checked by ESLint
import React, { useRef, useState, ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { apiPaths } from '../../../../service/apiPaths';
import ApiService from '../../../../service/ApiService';
import { SubmitHandler } from 'react-hook-form';
import { IAddContact } from '../../Contact.props';

const useAddContact = () => {
  const [formData, setFormData] = useState<IAddContact>({
    mobile: '',
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit: SubmitHandler<IAddContact> = async (data) => {
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('mobile', data.mobile);
    if (pdfFile) {
      formDataToSend.append('name', pdfFile);
    }

    try {
      const response = await ApiService({
        method: 'POST',
        endpoint: apiPaths.createContact,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response !== 'undefined') {
        alert("Contact added successfully");
        navigate('/Contacts');
        window.location.reload();
      }
    } catch (error: any) {
      alert(error.message);
      console.error("Error adding Contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setPdfFile(files[0]);
    }
  };

  const removePdf = () => {
    setPdfFile(null);
  };

  const handleCancel = () => {
    navigate('/');
  };

  return {
    formData,
    pdfFile,
    fileInputRef,
    loading,
    onDrop,
    removePdf,
    handleChange,
    handleSubmit,
    handleCancel,
  };
}

export default useAddContact;
