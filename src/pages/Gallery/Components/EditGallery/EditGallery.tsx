import React from "react";
import useEditGallery from "./useEditGallery";
import { CancelButton, FormButton } from "../../../../components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAddGallery, IGalleryId } from "../../Gallery.props";
import Loader from "../../../../components/Loder";

const EditGallery: React.FC<IGalleryId> = ({ GalleryId }) => {
  const {
    gallery,
    imageFile,
    removeImage,
    onDrop,
    handleChange,
    handleUpdate,
    handleCloseModal,
    loading,
  } = useEditGallery({ GalleryId });

  const {
    register,
    handleSubmit: useFormSubmit,
    formState: { errors },
  } = useForm<IAddGallery>();

  const handleSubmit: SubmitHandler<IAddGallery> = () => {
    handleUpdate();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      {loading && <Loader />}
      <div className="bg-main-bg rounded-lg p-8 w-full max-w-4xl h-3/4 overflow-y-auto">
        <h1 className="text-2xl mb-4">Edit Latest News</h1>
        <form onSubmit={useFormSubmit(handleSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="title">
                Title:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="title"
                {...register("title", { required: false })}
                value={gallery.title}
                onChange={handleChange}
              />
              {errors.title && (
                <span className="text-red-500 block">Title field is required</span>
              )}
            </div>
           
          
            <div className="col-span-2">
              {imageFile ? (
                <div className="flex justify-center relative">
                  <p className="bg-gray-300 border-2 border-gray-500 p-2">{imageFile.name}</p>
                  <button
                    onClick={removeImage}
                    className="absolute top-0 right-0 mt-1 mr-1 bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-600"
                  >
                    X
                  </button>
                </div>
              ) : (
                <div>
                  <label className="block text-gray-700 text-sm mb-2" htmlFor="imageUpload">
                    Upload Image:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={onDrop}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <FormButton
              className="py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
              type="submit"
              children="Update"
            />
            <CancelButton
              className="py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleCloseModal}
              children="Cancel"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGallery;
