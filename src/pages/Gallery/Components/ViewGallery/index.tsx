import React from "react";
import ViewGallery from "./ViewGallery";
import { IGallerys } from "../../Gallery.props";



const ViewGalleryIndex: React.FC<IGallerys> = ({ gallery }) => {
  return (
    <div>
      <ViewGallery gallery={gallery} />
    </div>
  );
};

export default ViewGalleryIndex;
