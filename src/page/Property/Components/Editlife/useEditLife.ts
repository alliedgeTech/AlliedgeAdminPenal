// useEditLife.ts

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPaths } from "../../../../service/apiPaths";
import ApiService from "../../../../service/ApiService";
import { IAddLife } from "../../life.props"; // Assume the correct path to your life.props file
import { SubmitHandler } from "react-hook-form";
import { toast } from 'react-hot-toast'; 

const useAddLife = (lifeId : any) => {
  const [formData, setFormData] = useState<IAddLife>({
    title: "",
    paragraph: "",
    images: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Handle changes to the form fields
  const handleChange = (name: keyof IAddLife, value: string | File | File[] | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle the form submission
  const handleSubmit: SubmitHandler<IAddLife> = async (data) => {
    setLoading(true);
    setError(null);

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        (formData.images as unknown as File[]).forEach((image) => {
          form.append("images", image);
        });
      } else {
        form.append(key, formData[key as keyof IAddLife] as any);
      }
    });

    try {
      const response = await ApiService({
        method: "POST",
        endpoint: `${apiPaths.addLife}`, // Replace with the correct endpoint
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response !== "undefined") {
        toast.success('Life entry added successfully');
        navigate("/life"); // Adjust the path according to your application's routing
      }
    } catch (error) {
      toast.error("Failed to add life entry. Please try again later.");
      setError("Failed to add life entry. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/life"); // Adjust the path according to your application's routing
  };

  return {
    loading,
    error,
    formData,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};

export default useAddLife;
