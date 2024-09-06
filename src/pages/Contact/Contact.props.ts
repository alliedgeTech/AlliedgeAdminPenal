export interface IContact {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
}
export interface IContacts{
  contact:IContact ;
}
export interface IContactId {
  ContactId: string;
}

export interface IAddContact {
  name: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
}
