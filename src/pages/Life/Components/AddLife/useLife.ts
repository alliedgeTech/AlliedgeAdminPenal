/* eslint-disable */
// All code here will not be checked by ESLint
import React, { useRef, useState, ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { apiPaths } from '../../../../service/apiPaths';
import ApiService from '../../../../service/ApiService';
import { SubmitHandler } from 'react-hook-form';
import { IAddLife } from '../../Life.props';

const useAddLife = () => {
  const [formData, setFormData] = useState<IAddLife>({
    images: "", // Assuming you store the image URL from Cloudinary
    title: '',
    paragraph: '',
 
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit: SubmitHandler<IAddLife> = async (data) => {
    //setFormData({title : formData.title , description : formData.description , images : formData.images})
    setLoading(true);
     const formDataToSend = new FormData();
     formDataToSend.append('title', formData.title);
     formDataToSend.append('paragraph', formData.paragraph);

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
        endpoint: apiPaths.createLife,
        data: formDataToSend,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response) {
        alert("Life added successfully");
        navigate('/Life');
        window.location.reload();
      }
      
    } catch (error: any) {
      alert(error.message);
      console.error("Error adding life:", error);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (life: ChangeEvent<HTMLInputElement>) => {
    try {
        const files = life.target.files;
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

export default useAddLife;
