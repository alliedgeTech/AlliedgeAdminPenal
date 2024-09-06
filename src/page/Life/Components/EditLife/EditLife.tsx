import React from "react";
import { IAddLife, ILifeId } from "../../Life.props";
import { useForm } from "react-hook-form";
import Loader from "../../../../components/Loader";
import useEditProperty from "./useEditLife";
import { CancelButton, FormButton } from "../../../../components/Botton";
import { Toaster } from "react-hot-toast";

const EditLife: React.FC<ILifeId> = ({ LifeId }) => {
  const { formData, loading, handleChange, handleSubmit, handleCancel } =
    useEditProperty(LifeId);
  const {
    register,
    handleSubmit: useFormSubmit,
    formState: { errors },
  } = useForm<IAddLife>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleChange("images", files);
  };

  const fields = [
    { label: "title", name: "title", type: "text" },
    { label: "Image", name: "images", type: "file" },
    { label: "paragraph", name: "paragraph", type: "text" }

  ] as const;

  return (
    <div className="flex flex-col items-center w-full h-screen p-8">
      <Toaster/>
      <div className="bg-white shadow-md rounded-lg pt-6 pb-6 w-full">
        <div className="border-b-2 w-[100%]">
          <h1 className="text-3xl mb-2 text-gray-700 ml-5">Edit Life Image</h1>
        </div>
        {loading && <Loader />}
        <form onSubmit={useFormSubmit(handleSubmit)} className="space-y-6">
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
                  {field.type === "file" ? (
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      type={field.type}
                      id={field.name}
                      {...register(field.name)}
                      onChange={handleFileChange}
                      multiple
                    />
                  ) : (
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      type={field.type}
                      id={field.name}
                      {...register(field.name)}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    />
                  )}
                  {errors[field.name] && (
                    <span className="text-red-500 text-xs italic">
                      {field.label} field is required
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
            <CancelButton
              className="py-2 px-4 rounded"
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </CancelButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLife;
