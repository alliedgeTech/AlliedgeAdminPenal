import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPaths } from "../../../../service/apiPaths";
import ApiService from "../../../../service/ApiService";
import { IAddProperty, IProperty } from "../../Property.props";
import { SubmitHandler } from "react-hook-form";
import { toast } from 'react-hot-toast'; 

const useAddProperty = () => {
  const [formData, setFormData] = useState<IAddProperty>({
    name: "",
    location: "",
    startingPrice: "",
    images: [],
    propertyType: "",
    bhk: "",
    sqft: 0,
    description: "",
    brochure: "",
    address: "",
    cityArea: "",
    price: "",
    propertySize: "",
    segment: "",
    categoryType: "",
    passionStatus: "",
    searchBudget: "",
    features: []
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [property, setProperty] = useState<IProperty | null>(null);

  const navigate = useNavigate();

  const handleChange = (name: keyof IAddProperty, value: string | File | File[] | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit: SubmitHandler<IAddProperty> = async (data) => {
    setLoading(true);
    setError(null);

    const form = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === "images") {
        (formData.images as File[]).forEach(image => {
          form.append("images", image);
        });
      } else {
        form.append(key, formData[key as keyof IAddProperty] as any);
      }
    });

    try {
      const response = await ApiService({
        method: "POST",
        endpoint: `${apiPaths.addProperty}`,
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response !== "undefined") {
        toast.success('Property added successfully')
        navigate("/property");
      }
    } catch (error) {
      toast.error("Failed to add property. Please try again later.")
      setError("Failed to add property. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/property");
  };

  return {
    loading,
    error,
    formData,
    property,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};

export default useAddProperty;
