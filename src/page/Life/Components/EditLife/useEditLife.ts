import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiPaths } from "../../../../service/apiPaths";
import ApiService from "../../../../service/ApiService";
import { IAddLife, ILife } from "../../Life.props";
import { SubmitHandler } from "react-hook-form";
import { toast } from 'react-hot-toast'; 

const useEditProperty = (LifeId: string) => {
  const [formData, setFormData] = useState<IAddLife>({
   title: "" ,
   images: "",
   paragraph: ""
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [life, setLife] = useState<ILife | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await ApiService({
        method: "GET",
        endpoint: `${apiPaths.getAllLife}`,
      });
      const life = response.filter((sys: any) => sys._id === LifeId);
      setLife(life[0]);
      populateFormData(life[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const populateFormData = (LifeData: ILife) => {
    setFormData({
   title: LifeData.title,
   images: LifeData.images,
   paragraph: LifeData.paragraph
    });
  };

  const handleChange = (name: keyof IAddLife, value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit: SubmitHandler<IAddLife> = async () => {
    try {
      const response = await ApiService({
        method: "PUT",
        endpoint: `${apiPaths.updateLife}/${LifeId}`,
        data: formData,
      });

      if (response !== "undefined") {
        toast.success("Life updated successfully");
        navigate("/life");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating  Life:", error);
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  return {
    loading,
    formData,
    life,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};

export default useEditProperty;
