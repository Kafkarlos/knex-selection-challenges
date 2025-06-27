export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number | string;
  gender?: string;
  country: string;
  state: string;
  city?: string;
  picture: string;
};
