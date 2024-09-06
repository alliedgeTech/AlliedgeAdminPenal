/* eslint-disable */
// All code here will not be checked by ESLint
import { useEffect, useState } from 'react';
import ApiService from '../../../../service/ApiService'; // Adjust the path accordingly
import { apiPaths } from '../../../../service/apiPaths';
import { IGallery, IGalleryId } from '../../Gallery.props';

const useEditGallery = ({ GalleryId }: IGalleryId) => {
  const [gallery, setGallery] = useState<IGallery>({
    title: '',
   
    
    
   
    _id: '',
    images: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await ApiService({
        method: 'GET',
        endpoint: `${apiPaths.getGallery}/${GalleryId}`,
      });
      setGallery(response);
      populateFormData(response);
    } catch (error: any) {
      alert(error);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const populateFormData = (galleryData: IGallery) => {
    setGallery({
      title: galleryData.title,
     
     
      _id: GalleryId,
      images: galleryData.images,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', gallery.title);
  
    
    if (imageFile) {
      formData.append('imageUrl', imageFile);
    } else {
      formData.append('imageUrl', gallery.images);
    }

    try {
      const response = await ApiService({
        method: 'PUT',
        endpoint: `${apiPaths.updateGallery}/${GalleryId}`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response);
      alert('Latest news updated successfully.');
      window.location.reload();
    } catch (error: any) {
      alert(error);
      console.error('Error updating latest news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGallery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDrop = (gallery: React.ChangeEvent<HTMLInputElement>) => {
    const files = gallery.target.files;
    if (files) {
      setImageFile(files[0]);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setGallery((prevState) => ({
      ...prevState,
      imageUrl: '',
    }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  return {
    gallery,
    imageFile,
    loading,
    removeImage,
    onDrop,
    handleChange,
    handleUpdate,
    handleCloseModal,
  };
};

export default useEditGallery;
