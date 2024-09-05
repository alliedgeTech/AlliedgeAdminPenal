/* eslint-disable */
// All code here will not be checked by ESLint
import React from "react";
import useAddLife from "./useLife";
import { useForm } from "react-hook-form";
import Button, {
  CancelButton,
  FormButton,
} from "../../../../components/Button";
import { IAddLife } from "../../Life.props";
import Loader from "../../../../components/Loder";

const AddLife: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const {
    formData,
    imageFiles,
    onDrop,
    handleChange,
    handleSubmit,
    removeImage,
    loading,
  } = useAddLife();
  const {
    register,
    handleSubmit: useFormSubmit,
    formState: { errors },
  } = useForm<IAddLife>();

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      {loading && <Loader />}
      <div className="bg-main-bg rounded-lg p-8 w-full max-w-4xl h-3/4 overflow-y-auto">
        <h1 className="text-2xl mb-4">Add Life</h1>
        <form onSubmit={useFormSubmit(handleSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            {/* Title */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="title"
              >
                Title:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="title"
                {...register("title", { required: false })}
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <span className="text-red-500 block">
                  Title field is required
                </span>
              )}
            </div>
            {/* Description */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="paragraph"
              >
                paragraph:
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="paragraph"
                {...register("paragraph", { required: false })}
                value={formData.paragraph}
                onChange={handleChange}
              />
              {errors.paragraph && (
                <span className="text-red-500 block">
                  paragraph field is required
                </span>
              )}
            </div>
            {/* Other fields... */}
            {/* Position */}
          
            {/* Image Upload */}
            <div className="col-span-2">
      {imageFiles.length > 0 ? (
        <div className="flex flex-wrap justify-center relative">
          {imageFiles.map((file, index) => (
            <div key={index} className="relative m-2">
              <p className="bg-gray-300 border-2 border-gray-500 p-2">
                {file.name}
              </p>
              <button
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 mt-1 mr-1 bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-600"
              >
                X
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="imageUpload"
          >
            Upload Images:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={onDrop}
            multiple // Allows multiple file selection
          />
        </div>
      )}
    </div>
          </div>
          <div className="flex justify-end mt-4">
            <FormButton
              className="py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
              type="submit"
              children="ADD"
            />
            <CancelButton
              className="py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleCloseModal}
              children="CANCEL"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLife;
