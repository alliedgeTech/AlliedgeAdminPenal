import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiPaths } from "../../../../service/apiPaths";
import ApiService from "../../../../service/ApiService";
import { IAddGallery, IGallery } from "../../Gallery.props";
import { SubmitHandler } from "react-hook-form";
import { toast } from 'react-hot-toast'; 

const useEditProperty = (GalleryId: string) => {
  const [formData, setFormData] = useState<IAddGallery>({
    title: "" ,
    images: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [gallery, setGallery] = useState<IGallery | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await ApiService({
        method: "GET",
        endpoint: `${apiPaths.getAllGallery}`,
      });
      const gallery = response.filter((sys: any) => sys._id === GalleryId);
      setGallery(gallery[0]);
      populateFormData(gallery[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const populateFormData = (GalleryData: IGallery) => {
    setFormData({
      title: GalleryData.title,
      images: GalleryData.images,
    });
  };

  const handleChange = (name: keyof IAddGallery, value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit: SubmitHandler<IAddGallery> = async () => {
    try {
      const response = await ApiService({
        method: "PUT",
        endpoint: `${apiPaths.updateGallery}/${GalleryId}`,
        data: formData,
      });

      if (response !== "undefined") {
        toast.success("Gallery updated successfully");
        navigate("/gallery");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating  Gallery:", error);
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  return {
    loading,
    formData,
    gallery,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};

export default useEditProperty;
