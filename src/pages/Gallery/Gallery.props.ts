export interface IGallery {
_id: string;
images: string, // Assuming you store the image URL from Cloudinary
title: string,


}
export interface IGallerys{
  gallery:IGallery ;
}
export interface IGalleryId {
  GalleryId: string;
}

export interface IAddGallery {
  images: string, // Assuming you store the image URL from Cloudinary
  title: string,


}
