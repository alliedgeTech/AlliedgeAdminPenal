import React from "react";
import { IGalleryId } from "../../Gallery.props";
import EditGallery from "./EditGallery";

const EditGalleryIndex: React.FC<IGalleryId> = ({ GalleryId }) => {
  return <EditGallery GalleryId={GalleryId} />;
};

export default EditGalleryIndex;
