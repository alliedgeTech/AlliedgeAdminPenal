import React from "react";
import AddGallery from "./AddGallery";

/**
 * Index component for adding a new event
 * @param closeModal Function to close the modal
 */
export const AddGalleryIndex: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {

    return (
        <AddGallery closeModal={closeModal} />
    )
} 
