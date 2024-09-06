import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiPaths } from "../../../../service/apiPaths";
import ApiService from "../../../../service/ApiService";
import { IAddProperty, IProperty } from "../../Property.props";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

const useEditProperty = (PropertyId: string) => {
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
    features: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [property, setProperty] = useState<IProperty | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await ApiService({
        method: "GET",
        endpoint: `${apiPaths.getAllProperties}`,
      });
      const property = response.filter((sys: any) => sys._id === PropertyId);
      setProperty(property[0]);
      populateFormData(property[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const populateFormData = (propertyData: IProperty) => {
    setFormData({
      name: propertyData.name,
      location: propertyData.location,
      startingPrice: propertyData.startingPrice,
      images: propertyData.images,
      propertyType: propertyData.propertyType,
      bhk: propertyData.bhk,
      sqft: propertyData.sqft,
      description: propertyData.description,
      brochure: propertyData.brochure,
      address: propertyData.address,
      cityArea: propertyData.cityArea,
      price: propertyData.price,
      propertySize: propertyData.propertySize,
      segment: propertyData.segment,
      categoryType: propertyData.categoryType,
      passionStatus: propertyData.passionStatus,
      searchBudget: propertyData.searchBudget,
      features: propertyData.features || [],
    });
  };

  const handleChange = (name: keyof IAddProperty, value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: prevFormData.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit: SubmitHandler<IAddProperty> = async () => {
    setLoading(true);
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        (formData.images as (File | string)[]).forEach((image) => {
          if (image instanceof File) {
            form.append("images", image);
          }
        });
      } else if (key === "brochure" && formData.brochure instanceof File) {
        form.append("brochure", formData.brochure);
      } else {
        form.append(key, formData[key as keyof IAddProperty] as any);
      }
    });

    try {
      const response = await ApiService({
        method: "PUT",
        endpoint: `${apiPaths.updateProperty}/${PropertyId}`,
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response !== "undefined") {
        toast.success("Property updated successfully");
        navigate("/property");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating Property:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/property");
  };

  return {
    loading,
    formData,
    property,
    handleChange,
    handleSubmit,
    handleCancel,
    removeImage,
  };
};

export default useEditProperty;
