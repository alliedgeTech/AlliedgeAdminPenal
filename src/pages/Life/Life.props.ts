export interface ILife {
_id: string;
images: string, // Assuming you store the image URL from Cloudinary
title: string,
paragraph: string,

}
export interface ILifes{
  life:ILife ;
}
export interface ILifeId {
  LifeId: string;
}

export interface IAddLife {
  images: string, // Assuming you store the image URL from Cloudinary
  title: string,
  paragraph: string,

}
