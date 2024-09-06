export interface ILife {
  _id: string;
  title: string;
  paragraph: string;
 images: string | File;
}
export interface ILifes {
  name: ILife | any;
}
export interface ILifeId {
  LifeId: string | any;
}

export interface IAddLife {
  title: string;
  paragraph: string;
  images: string | File;
}
