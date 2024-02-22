import { Publisher } from "./Publisher";

export interface BookDetails {
    code: number;
    bookName: string | null;
    category: string | null;
    author: string | null;
    deleted: boolean;
    price: number | null;
    publisherId: Publisher | null;
    image: string | null;
    numOfCopies:number;

}