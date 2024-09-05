/* eslint-disable */
// All code here will not be checked by ESLint
import { useEffect, useState } from 'react';
import ApiService from '../../../../service/ApiService'; // Adjust the path accordingly
import { apiPaths } from '../../../../service/apiPaths';
import { ILife, ILifeId } from '../../Life.props';

const useEditLife = ({ LifeId }: ILifeId) => {
  const [life, setLife] = useState<ILife>({
    title: '',
    paragraph: '',
    
    
   
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
        endpoint: `${apiPaths.getLife}/${LifeId}`,
      });
      setLife(response);
      populateFormData(response);
    } catch (error: any) {
      alert(error);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const populateFormData = (lifeData: ILife) => {
    setLife({
      title: lifeData.title,
      paragraph: lifeData.paragraph,
     
      _id: LifeId,
      images: lifeData.images,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', life.title);
    formData.append('paragraph', life.paragraph);
    
    if (imageFile) {
      formData.append('imageUrl', imageFile);
    } else {
      formData.append('imageUrl', life.images);
    }

    try {
      const response = await ApiService({
        method: 'PUT',
        endpoint: `${apiPaths.updateLife}/${LifeId}`,
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
    setLife((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDrop = (life: React.ChangeEvent<HTMLInputElement>) => {
    const files = life.target.files;
    if (files) {
      setImageFile(files[0]);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setLife((prevState) => ({
      ...prevState,
      imageUrl: '',
    }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  return {
    life,
    imageFile,
    loading,
    removeImage,
    onDrop,
    handleChange,
    handleUpdate,
    handleCloseModal,
  };
};

export default useEditLife;
