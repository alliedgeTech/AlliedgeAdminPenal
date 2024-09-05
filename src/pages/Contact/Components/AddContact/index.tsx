import React from "react";
import AddContact from "./AddContact";

/**
 * Index component for adding a new contact
 * @param closeModal Function to close the modal
 */
export const AddContactIndex: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {

    return (
        <AddContact closeModal={closeModal} />
    )
} 
