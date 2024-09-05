import React from "react";
import AddLife from "./AddLife";

/**
 * Index component for adding a new event
 * @param closeModal Function to close the modal
 */
export const AddLifeIndex: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {

    return (
        <AddLife closeModal={closeModal} />
    )
} 
