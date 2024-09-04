export interface IGallery {
  _id: string;
  title: string;
  images: Array<string | File>; // Array to store multiple images
}

export interface IGallerys {
  gallery: IGallery;
}

export interface IGalleryId {
  galleryId: string | any;
}

export interface IAddGallery {
  title: string;
  images: Array<string | File>; // Array to accept multiple images
}
