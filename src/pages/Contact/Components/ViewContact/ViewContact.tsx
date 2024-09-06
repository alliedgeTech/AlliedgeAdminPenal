/* eslint-disable */
// All code here will not be checked by ESLint
import React from "react";
import useViewContact from "./useContact";
import Button, { CancelButton } from "../../../../components/Button";
import { IContacts } from "../../Contact.props";

const ViewContact: React.FC<IContacts> = ({
  contact,
}) => {
  const { isModalOpen, handleCloseModal } = useViewContact();
  if (!isModalOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-main-bg gap-10 rounded-lg p-8 max-w-xl flex">
        
        <div className="w-1/2">
          <h1 className="text-2xl  mb-4">Contact Details</h1>
          <div>
            <p className="mb-2">ID: {contact._id}</p>
            <p className="mb-2">
              Contact Name: {contact.name}
            </p>
          </div>
          <div className="mt-4">
            <CancelButton
              onClick={handleCloseModal}
              className=" mt-10  py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-40"
              children="Close"
              type="button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContact;
