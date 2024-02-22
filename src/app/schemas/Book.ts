import { BookDetails } from "./BookDetails";

export interface Book {
    id: number;
    isBorrowed: boolean;
    deleted: boolean;
    bookCode: BookDetails;


}