import React from "react";
import Gallery from "./Components/Gallery";
import useGallery from "./useGallery";

const GalleryIndex: React.FC = () => {
  const GalleryProps = useGallery();

  return <Gallery />;
};
export default GalleryIndex;
