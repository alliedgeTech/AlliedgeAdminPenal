export interface IGallery {
  _id: string;
  title: string;
 images: string | File;
}
export interface IGallerys {
  name: IGallery | any;
}
export interface IGalleryId {
  GalleryId: string | any;
}

export interface IAddGallery {
  title: string;
  images: string | File;
}
