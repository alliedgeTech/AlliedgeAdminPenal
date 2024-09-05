/* eslint-disable */
// All code here will not be checked by ESLint
import React, { useRef, useState, ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { apiPaths } from '../../../../service/apiPaths';
import ApiService from '../../../../service/ApiService';
import { SubmitHandler } from 'react-hook-form';
import { IAddGallery } from '../../Gallery.props';

const useAddGallery = () => {
  const [formData, setFormData] = useState<IAddGallery>({
    images: "", // Assuming you store the image URL from Cloudinary
    title: '',
   
 
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit: SubmitHandler<IAddGallery> = async (data) => {
    //setFormData({title : formData.title , description : formData.description , images : formData.images})
    setLoading(true);
     const formDataToSend = new FormData();
     formDataToSend.append('title', formData.title);
    

     if (imageFiles.length === 0) {
      alert("Please upload at least one image.");
      setLoading(false);
      return;
  }


  imageFiles.forEach((image, index) => {
    formDataToSend.append('images', image);  // Append each image correctly
});

    try {
      const response = await ApiService({
        method: 'POST',
        endpoint: apiPaths.createGallery,
        data: formDataToSend,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response) {
        alert("Gallery added successfully");
        navigate('/Gallery');
        window.location.reload();
      }
      
    } catch (error: any) {
      alert(error.message);
      console.error("Error adding gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (gallery: ChangeEvent<HTMLInputElement>) => {
    try {
        const files = gallery.target.files;
        if (files) {
            setImageFiles(Array.from(files)); // Update state with selected files
        }
    } catch (error) {
        console.error("Error occurred while uploading files:", error);
    }
};
  const removeImage = (index: number) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    navigate('/');
  };

  return {
    formData,
    imageFiles,
    fileInputRef,
    loading,
    onDrop,
    removeImage,
    handleChange,
    handleSubmit,
    handleCancel,
  };
}

export default useAddGallery;
