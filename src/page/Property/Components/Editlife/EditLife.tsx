/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from "react";
import { IAddLife, ILifeId } from "../../life.props";
import { useForm } from "react-hook-form";
import Loader from "../../../../components/Loader";
import useEditLife from "./useEditLife";
import { Toaster } from "react-hot-toast";
import { CancelButton, FormButton } from "../../../../components/Botton";

const EditLife: React.FC<ILifeId> = ({ lifeId }) => {
  const { formData, loading, handleChange, handleSubmit, handleCancel,  } = useEditLife(lifeId);
  const { register, handleSubmit: useFormSubmit, formState: { errors } } = useForm<IAddLife>();



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleChange("images", [ ...files]);
  };

 

  const fields = [
    { label: "Title", name: "title", type: "text" },
    { label: "Paragraph", name: "paragraph", type: "text" },
    { label: "Images", name: "images", type: "file" }
  ] as const;

  function removeImage(index: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col items-center w-full h-screen p-8">
      <Toaster />
      <div className="bg-white shadow-md rounded-lg pt-6 pb-6 w-full">
        <div className="border-b-2 w-[100%]">
          <h1 className="text-3xl mb-2 text-gray-700 ml-5">Edit Life Event</h1>
        </div>
        {loading && <Loader />}
        <form onSubmit={useFormSubmit(handleSubmit)} className="space-y-6">
          <fieldset className="m-2 rounded border-opacity-60 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor={field.name}>
                    {field.label}:
                  </label>
                  {field.type === "file" ? (
                    <>
                      <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        type={field.type}
                        id={field.name}
                        {...register(field.name)}
                        onChange={handleFileChange}
                        multiple
                      />
                      {formData.images.length > 0 && (
                        <div className="flex flex-wrap mt-2">
                          {formData.images.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={typeof image === "string" ? image : URL.createObjectURL(image)}
                                alt={`Image ${index}`}
                                className="w-24 h-24 mr-2 mb-2"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-0 right-0 bg-red-500 text-white h-5 w-5 flex items-center justify-center rounded-full"
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      type={field.type}
                      id={field.name}
                      {...register(field.name)}
                      value={formData[field.name as keyof IAddLife] || ""}
                      onChange={(e) => handleChange(field.name as keyof IAddLife, e.target.value)}
                    />
                  )}
                  {errors[field.name as keyof IAddLife] && (
                    <span className="text-red-500 text-xs italic">
                      {errors[field.name as keyof IAddLife]?.message || `${field.label} field is required`}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </fieldset>
          <div className="flex justify-start mt-6 ml-10">
            <FormButton className="py-2 px-4 rounded mr-4" type="submit">
              Update
            </FormButton>
            <CancelButton className="py-2 px-4 rounded" onClick={handleCancel} type="button">
              Cancel
            </CancelButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLife;
