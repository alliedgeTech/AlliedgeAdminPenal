import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPaths } from "../../../../service/apiPaths";
import ApiService from "../../../../service/ApiService";
import { IAddGallery, IGallery } from "../../Gallery.props";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

const useAddProperty = () => {
  const [formData, setFormData] = useState<IAddGallery>({
    title: "",
    images: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [gallery, setGallery] = useState<IGallery | null>(null);

  const navigate = useNavigate();

  const handleChange = (
    name: string,
    value: string | File | File[] | null
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit: SubmitHandler<IAddGallery> = async () => {
    setLoading(true);
    setError(null);

    const form = new FormData();
    form.append("title", formData.title);
    
    if (Array.isArray(formData.images)) {
      formData.images.forEach((images: File | any) => {
        form.append("images", images);
      });
    }

    try {
      const response = await ApiService({
        method: "POST",
        endpoint: apiPaths.addGallery,
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        toast.success("Gallery added successfully");
        navigate("/gallery");
      }
    } catch (error) {
      toast.error("Failed to add gallery. Please try again later.");
      setError("Failed to add gallery. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/gallery");
  };

  return {
    loading,
    error,
    formData,
    gallery,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};

export default useAddProperty;
