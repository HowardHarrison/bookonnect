export type Categories = {
  _id: string;
  name: string;
}

export type Writers = {
  _id: string;
  name: string;
}

export type Book = {
    _id: string;
    title: string;
    description: string;
    publishDate: Date | string;
    coverImage: string;
    writer: Writers;
    categories: Categories[];
}