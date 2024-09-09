/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../../../../components/Loader";
import useAddGallery from "./useAddGallery";
import { IAddGallery } from "../../Gallery.props";
import { CancelButton, FormButton } from "../../../../components/Botton";
import { toast, Toaster } from 'react-hot-toast'; // Importing toast and Toaster

const AddGallery: React.FC = () => {
  const { formData, loading, handleChange, handleSubmit, handleCancel, error } = useAddGallery();
  const { register, handleSubmit: useFormSubmit, formState: { errors } } = useForm<IAddGallery>();
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Adjusted for single image

  const fields = [
    { label: "title", name: "title", type: "text" },
    { label: "Image", name: "images", type: "file" },
  ] as const;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file && ["image/jpeg", "image/png"].includes(file.type)) {
        handleChange("images", file); // Pass the single file
        const preview = URL.createObjectURL(file);
        setImagePreview(preview);
        toast.success("Image uploaded successfully!"); // Success toast
      } else {
        toast.error("Please upload a valid image (JPEG or PNG)."); // Error toast
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen p-8">
      <Toaster position="top-right" /> {/* Toaster component for displaying notifications */}
      <div className="bg-white shadow-md rounded-lg pt-6 pb-6 w-full">
        <div className="border-b-2 w-[100%]">
          <h1 className="text-3xl mb-2 text-gray-700 ml-5">Add Gallery Image</h1>
        </div>
        {loading && <Loader />}
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form onSubmit={useFormSubmit(handleSubmit)} className="space-y-6">
          <fieldset className="m-2 rounded border-opacity-60 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor={field.name}>
                    {field.label}:
                  </label>
                  {field.name === "images" ? (
                    <input
                      type="file"
                      id={field.name}
                      {...register(field.name)}
                      onChange={handleImageChange}
                    />
                  ) : (
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      type={field.type}
                      id={field.name}
                      {...register(field.name as keyof IAddGallery)}
                      value={(formData[field.name as keyof IAddGallery] as string) || ""}
                      onChange={(e) =>
                        handleChange(field.name as keyof IAddGallery, e.target.value)
                      }
                    />
                  )}
                  {errors[field.name as keyof IAddGallery] && (
                    <span className="text-red-500 text-xs italic">
                      This field is required
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
        {imagePreview && (
          <div className="mt-6">
            <img
              src={imagePreview}
              alt="Image preview"
              className="h-32 w-32 object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddGallery;
