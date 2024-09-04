export interface ILife {
  _id: string;
  title: string;
  images: string[];
  paragraph: string;
  __v: number;
  status?: string; // Assuming status is optional and may not always be present
}

export interface ILives {
  lives: ILife[];
}

export interface ILifeId {
  lifeId: string;
}

export interface IAddLife {
  title: string;
  images: string[];
  paragraph: string;
}
