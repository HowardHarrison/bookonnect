export type Book = {
    id: string;
    title: string;
    description: string;
    publishDate: Date | string;
    coverImage: string;
    writer: string;
    categories: string[];
}