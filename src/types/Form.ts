export type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picture: File | string; // usually a File object after Dropzone
};

export type LoginValues = {
  email: string;
  password: string;
};