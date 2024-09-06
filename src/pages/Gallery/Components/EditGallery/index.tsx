import React from "react";
import { IGalleryId } from "../../Gallery.props";
import EditGallery from "./EditGallery";

<<<<<<< HEAD:src/page/Gallery/Components/EditGallery/index.tsx
const EditGalleryIndex: React.FC<IGalleryId> = ({ GalleryId }) => {
  return <EditGallery GalleryId={GalleryId} />;
};
=======


const EditGalleryIndex: React.FC<IGalleryId> = ({ GalleryId }) => {

    return (
        <EditGallery GalleryId={GalleryId}/>
    );
}
>>>>>>> b713862f4f2c281a0279c5e1925ebda64ea136a6:src/pages/Gallery/Components/EditGallery/index.tsx

export default EditGalleryIndex;
