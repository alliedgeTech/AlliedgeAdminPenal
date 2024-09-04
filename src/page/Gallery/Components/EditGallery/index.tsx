import React from "react";
import { IGalleryId } from "../../Gallery.props";
import EditGallery from "./EditGallery";

const EditGalleryIndex: React.FC<IGalleryId> = ({ galleryId }) => {
  return <EditGallery galleryId={galleryId} />;
};

export default EditGalleryIndex;
