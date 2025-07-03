export type Review = {
    _id : string;
    userId: string;
    bookId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

export type AllReview = {
    _id : string;
    userId: {
        _id: string;
        firstName: string;
        profileImage: string;
    };
    bookId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}