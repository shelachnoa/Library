import { Reader } from "./Reader";
import { Book } from "./Book";
export interface Borrowing {
    id:number;
    readerId:Reader | null;
    bookId:Book|null;
    borrowedDate:Date;
    returnedDate:Date | null;
    delayDays?:number;


}