/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { IAddProperty, IPropertyId } from "../../Property.props";
import { useForm } from "react-hook-form";
import Loader from "../../../../components/Loader";
import useEditProperty from "./useEditProperty";
import { Toaster } from "react-hot-toast";
import { CancelButton, FormButton } from "../../../../components/Botton";


const EditProperty: React.FC<IPropertyId> = ({ PropertyId }) => {
  const { formData, loading, handleChange, handleSubmit, handleCancel, removeImage } = useEditProperty(PropertyId);
  const {
    register,
    handleSubmit: useFormSubmit,
    formState: { errors },
  } = useForm<IAddProperty>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleChange("images", [...formData.images, ...files]);
  };

  const handleBrochureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    handleChange("brochure", file);
  };

  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Location", name: "location", type: "text" },
    { label: "Starting Price", name: "startingPrice", type: "text" },
    { label: "Property Type", name: "propertyType", type: "select" },
    { label: "BHK", name: "bhk", type: "text" },
    { label: "SQFT", name: "sqft", type: "number" },
    { label: "Description", name: "description", type: "text" },
    { label: "Address", name: "address", type: "text" },
    { label: "City Area", name: "cityArea", type: "text" },
    { label: "Price", name: "price", type: "text" },
    { label: "Property Size", name: "propertySize", type: "text" },
    { label: "Segment", name: "segment", type: "text" },
    { label: "Category Type", name: "categoryType", type: "text" },
    { label: "Passion Status", name: "passionStatus", type: "text" },
    { label: "Search Budget", name: "searchBudget", type: "text" },
    { label: "Features", name: "features", type: "text" },
    { label: "Brochure", name: "brochure", type: "file" },
    { label: "Images", name: "images", type: "file" },
  ] as const;

  return (
    <div className="flex flex-col items-center w-full h-screen p-8">
      <Toaster />
      <div className="bg-white shadow-md rounded-lg pt-6 pb-6 w-full">
        <div className="border-b-2 w-[100%]">
          <h1 className="text-3xl mb-2 text-gray-700 ml-5">Edit Property</h1>
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
                  {field.type === "select" ? (
                    <select
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                      id={field.name}
                      {...register(field.name)}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                    >
                      <option value="">Select Property Type</option>
                      <option value="Pre-Launch">Pre-Launch</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Villa">Villa</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : field.type === "file" ? (
                    <>
                      {field.name === "brochure" ? (
                        <>
                          <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            type={field.type}
                            id={field.name}
                            {...register(field.name)}
                            onChange={handleBrochureChange}
                          />
                          {/* {formData.brochure && typeof formData.brochure === "string" && (
                            <p className="text-blue-500 mt-2">
                              <a href={formData.brochure} target="_blank" rel="noopener noreferrer">
                                {formData.brochure}
                              </a>
                            </p>
                          )} */}
                        </>
                      ) : (
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
                      )}
                    </>
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
                    <span className="text-red-500 text-xs italic">{field.label} field is required</span>
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

export default EditProperty;
