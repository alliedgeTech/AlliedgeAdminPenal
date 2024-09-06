/* eslint-disable */
// All code here will not be checked by ESLint
import React from "react";
import useEditContact from "./useEditContact";
import { CancelButton, FormButton } from "../../../../components/Button";
import Loader from "../../../../components/Loder";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAddContact, IContactId } from "../../Contact.props";

const EditContact: React.FC<IContactId> = ({ ContactId }) => {
  const {
    contact,
    pdfFile,
    removePdf,
    onDrop,
    handleChange,
    handleUpdate,
    handleCloseModal,
    loading,
  } = useEditContact({ ContactId });
  const {
    register,
    handleSubmit: useFormSubmit,
    formState: { errors },
  } = useForm<IAddContact>();

  const handleSubmit: SubmitHandler<IAddContact> = () => {
    handleUpdate();
    // handleCloseModal();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      {loading && <Loader />}
      <div className="bg-main-bg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl mb-4">Edit Contact</h1>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-1/2">
            <form onSubmit={useFormSubmit(handleSubmit)}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="name">
                name:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="name"
                  {...register('name', { required: false })}
                  value={contact.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="text-red-500 block">name field is required</span>}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="mobile">
                mobile:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="mobile"
                  {...register('mobile', { required: false })}
                  value={contact.mobile}
                  onChange={handleChange}
                />
                {errors.mobile && <span className="text-red-500 block">mobile field is required</span>}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                email:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="email"
                  {...register('email', { required: false })}
                  value={contact.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="text-red-500 block">email field is required</span>}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="subject">
                subject:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="subject"
                  {...register('subject', { required: false })}
                  value={contact.subject}
                  onChange={handleChange}
                />
                {errors.subject && <span className="text-red-500 block">subject field is required</span>}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="message">
                message:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="message"
                  {...register('message', { required: false })}
                  value={contact.message}
                  onChange={handleChange}
                />
                {errors.message && <span className="text-red-500 block">message field is required</span>}
              </div>
              <div className="flex justify-end">
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
      </div>
    </div>
  );
};

export default EditContact;
