import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPaths } from "../../../../service/apiPaths";
import ApiService from "../../../../service/ApiService";
import { IAddLife, ILife } from "../../Life.props";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

const useAddProperty = () => {
  const [formData, setFormData] = useState<IAddLife>({
    title: "",
    images: "",
    paragraph: ""
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [life, setLife] = useState<ILife | null>(null);

  const navigate = useNavigate();

  const handleChange = (
    name: keyof IAddLife,
    value: string | File | File[] | null
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit: SubmitHandler<IAddLife> = async () => {
    setLoading(true);
    setError(null);

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        if (Array.isArray(formData.images)) {
          formData.images.forEach((file: File) => {
            form.append("image", file);
          });
        } else if (formData.images instanceof File) {
          form.append("image", formData.images);
        }
      } else {
        form.append(key, formData[key as keyof IAddLife] as any);
      }
    });
    try {
      const response = await ApiService({
        method: "POST",
        endpoint: `${apiPaths.addLife}`,
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response !== "undefined") {
        toast.success("Life added successfully");
        navigate("/life");
      }
    } catch (error) {
      toast.error("Failed to add life. Please try again later.");
      setError("Failed to add life. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/life");
  };

  return {
    loading,
    error,
    formData,
    life,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};

export default useAddProperty;
