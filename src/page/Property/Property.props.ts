export interface IProperty {
  _id: string;
  name: string;
  location: string;
  startingPrice: string;
  images: (File | string)[];
  propertyType: string;
  bhk: string;
  sqft: number;
  description: string;
  brochure: string | File;
  address: string;
  cityArea: string;
  price: string;
  propertySize: string;
  segment: string;
  categoryType: string;
  passionStatus: string;
  searchBudget: string;
  features: string[];
}
export interface IPropertys {
  name: IProperty | any;
}
export interface IPropertyId {
  PropertyId: string | any;
}

export interface IAddProperty {
  name: string;
  location: string;
  startingPrice: string;
  images: (File | string)[];
  propertyType: string;
  bhk: string;
  sqft: number;
  description: string;
  brochure: string | File;
  address: string;
  cityArea: string;
  price: string;
  propertySize: string;
  segment: string;
  categoryType: string;
  passionStatus: string;
  searchBudget: string;
  features: string[];
}
