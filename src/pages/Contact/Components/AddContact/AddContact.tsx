/* eslint-disable */
// All code here will not be checked by ESLint
import React from "react";
import useAddContact from "./useAddContact";
import { useForm } from "react-hook-form";
import Button, {
  CancelButton,
  FormButton,
} from "../../../../components/Button";
import { IAddContact } from "../../Contact.props";
import Loader from "../../../../components/Loder";

const AddContact: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const {
    formData,
    pdfFile,
    onDrop,
    handleChange,
    handleSubmit,
    removePdf,
    loading,
  } = useAddContact();
  const {
    register,
    handleSubmit: useFormSubmit,
    formState: { errors },
  } = useForm<IAddContact>();

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      {loading && <Loader />}
      <div className="bg-main-bg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl mb-4">Add Contact</h1>
        <div className="flex items-center space-x-4 mb-6">
            <div className="w-1/2">
            <form onSubmit={useFormSubmit(handleSubmit)}>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm mb-2"
                  htmlFor="name"
                >
                  name:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <span className="text-red-500 block">
                    name field is required
                  </span>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm mb-2"
                  htmlFor="mobile"
                >
                  mobile:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="mobile"
                  {...register("mobile", { required: true })}
                  value={formData.mobile}
                  onChange={handleChange}
                />
                {errors.mobile && (
                  <span className="text-red-500 block">
                    mobile field is required
                  </span>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm mb-2"
                  htmlFor="email"
                >
                  email:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="email"
                  {...register("email", { required: true })}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="text-red-500 block">
                    email field is required
                  </span>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm mb-2"
                  htmlFor="subject"
                >
                  subject:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="subject"
                  {...register("subject", { required: true })}
                  value={formData.subject}
                  onChange={handleChange}
                />
                {errors.subject && (
                  <span className="text-red-500 block">
                    subject field is required
                  </span>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm mb-2"
                  htmlFor="message"
                >
                  message:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="message"
                  {...register("message", { required: true })}
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <span className="text-red-500 block">
                    message field is required
                  </span>
                )}
              </div>
              <div className="flex justify-end">
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
      </div>
    </div>
  );
};

export default AddContact;
