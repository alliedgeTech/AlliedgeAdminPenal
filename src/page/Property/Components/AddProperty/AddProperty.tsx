import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../../../../components/Loader";
import useAddProperty from "./useAddProperty";
import { IAddProperty } from "../../Property.props";
import { CancelButton, FormButton } from "../../../../components/Botton";
import { toast, Toaster } from "react-hot-toast";

const AddProperty: React.FC = () => {
  const { formData, loading, handleChange, handleSubmit, handleCancel, error } =
    useAddProperty();
  const {
    register,
    handleSubmit: useFormSubmit,
    formState: { errors },
  } = useForm<IAddProperty>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [brochurePreview, setBrochurePreview] = useState<string | null>(null);

  const fields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      validation: { required: "Name is required" },
    },
    {
      label: "Location",
      name: "location",
      type: "text",
      validation: { required: "Location is required" },
    },
    {
      label: "Starting Price",
      name: "startingPrice",
      type: "text",
      validation: { required: "Starting Price is required" },
    },
    {
      label: "Property Type",
      name: "propertyType",
      type: "select",
      validation: { required: "Property Type is required" },
    },
    {
      label: "BHK",
      name: "bhk",
      type: "text",
      validation: { required: "BHK is required" },
    },
    {
      label: "SQFT",
      name: "sqft",
      type: "number",
      validation: {
        required: "SQFT is required",
        min: { value: 1, message: "SQFT must be greater than 0" },
      },
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      validation: { required: "Description is required" },
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      validation: { required: "Address is required" },
    },
    {
      label: "City Area",
      name: "cityArea",
      type: "text",
      validation: { required: "City Area is required" },
    },
    {
      label: "Price",
      name: "price",
      type: "text",
      validation: { required: "Price is required" },
    },
    {
      label: "Property Size",
      name: "propertySize",
      type: "text",
      validation: { required: "Property Size is required" },
    },
    {
      label: "Segment",
      name: "segment",
      type: "text",
      validation: { required: "Segment is required" },
    },
    {
      label: "Category Type",
      name: "categoryType",
      type: "text",
      validation: { required: "Category Type is required" },
    },
    {
      label: "Passion Status",
      name: "passionStatus",
      type: "text",
      validation: { required: "Passion Status is required" },
    },
    {
      label: "Search Budget",
      name: "searchBudget",
      type: "text",
      validation: { required: "Search Budget is required" },
    },
    {
      label: "Features",
      name: "features",
      type: "text",
      validation: { required: "Features are required" },
    },
    { label: "Brochure", name: "brochure", type: "file" },
    { label: "Images", name: "images", type: "file" },
  ] as const;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).filter((file) =>
        ["image/jpeg", "image/png"].includes(file.type)
      );
      if (filesArray.length + (formData.images as File[]).length > 20) {
        toast("You can only upload up to 20 images.", {
          icon: "",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        return;
      }

      const newFilesArray = [...(formData.images as File[]), ...filesArray];
      handleChange("images", newFilesArray);

      const previews = newFilesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleBrochureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        handleChange("brochure", file);
        setBrochurePreview(URL.createObjectURL(file));
      } else {
        toast("Please upload a PDF file for the brochure.", {
          icon: "🙏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newImagePreviews);

    // Update formData.images as well
    const updatedImages = (formData.images as File[]).filter(
      (_, i) => i !== index
    );
    handleChange("images", updatedImages);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen p-8">
      <Toaster />
      <div className="bg-white shadow-md rounded-lg pt-6 pb-6 w-full">
        <div className="border-b-2 w-[100%]">
          <h1 className="text-3xl mb-2 text-gray-700 ml-5">Add Property</h1>
        </div>
        {loading && <Loader />}
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form
          onSubmit={useFormSubmit((data) => handleSubmit({ ...data }))}
          className="space-y-6"
        >
          <fieldset className="m-2 rounded border-opacity-60 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label
                    className="block text-gray-700 text-base font-semibold mb-2"
                    htmlFor={field.name}
                  >
                    {field.label}:
                  </label>
                  {field.name === "propertyType" ? (
                    <select
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      id={field.name}
                      {...register(
                        field.name as keyof IAddProperty,
                        field.validation
                      )}
                      value={
                        (formData[
                          field.name as keyof IAddProperty
                        ] as string) || ""
                      }
                      onChange={(e) =>
                        handleChange(
                          field.name as keyof IAddProperty,
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select Property Type</option>
                      <option value="Pre-Launch">Pre-Launch</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Villa">Villa</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : field.name === "images" ? (
                    <input
                      type="file"
                      id={field.name}
                      {...register(field.name)}
                      onChange={handleImageChange}
                      multiple
                    />
                  ) : field.name === "brochure" ? (
                    <input
                      type="file"
                      id={field.name}
                      {...register(field.name)}
                      onChange={handleBrochureChange}
                    />
                  ) : (
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      type={field.type}
                      id={field.name}
                      {...register(
                        field.name as keyof IAddProperty,
                        field.validation
                      )}
                      value={
                        (formData[
                          field.name as keyof IAddProperty
                        ] as string) || ""
                      }
                      onChange={(e) =>
                        handleChange(
                          field.name as keyof IAddProperty,
                          e.target.value
                        )
                      }
                    />
                  )}
                  {errors[field.name as keyof IAddProperty] && (
                    <span className="text-red-500 text-xs italic">
                      {errors[field.name as keyof IAddProperty]?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </fieldset>
          <div className="flex justify-start mt-6 ml-10">
            <FormButton className="py-2 px-4 rounded mr-4" type="submit">
              Add
            </FormButton>
            <CancelButton
              className="py-2 px-4 rounded"
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </CancelButton>
          </div>
        </form>
        <div className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {imagePreviews.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt={`preview-${index}`}
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white h-5 w-5 flex items-center justify-center rounded-full"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          {brochurePreview && (
            <div className="mt-4">
              <iframe
                src={brochurePreview}
                title="Brochure Preview"
                className="w-full h-96 border-none"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
