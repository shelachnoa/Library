import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, retry, tap } from 'rxjs';
import { Book } from './schemas/Book';
import { BookDetails } from './schemas/BookDetails';



@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private baseUrl: string = "http://localhost:8080";
  private bookListSubject = new Subject<void>();
  private copyListSubject = new Subject<Book[]>();
  libraryBooks: Book[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

  };

  constructor(private http: HttpClient) {

  }
  getBookList(): Observable<BookDetails[]> {
    const res = this.http.get<BookDetails[]>(this.baseUrl + "/bookDetails");
    return res;

  }
  addBook(body: BookDetails): Observable<any> {
   
      const res = this.http.post<any>(this.baseUrl + "/bookDetails/addBookDetails", body, this.httpOptions)
      // res.subscribe((msg:string)=>{console.log(msg)
      // });
      return res;
    
  

  }

  searchBookByName(searchTerm: String): Observable<BookDetails[]> {
    return this.http.get<BookDetails[]>(this.baseUrl + `/bookDetails/searchName?name=${searchTerm}`)

  }
  getUnBorrowedBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + "/books/unBorrowed")
  }
   // This method will be called after adding a new book
   notifyBookListChanged(): void {
    this.bookListSubject.next();
  }

  // Subscribe to this method to get notified when the book list changes
  onBookListChanged(): Observable<void> {
    return this.bookListSubject.asObservable();
  }

  notifyCopyListChanged(): void {
    this.bookListSubject.next();
  }

  // Subscribe to this method to get notified when the book list changes
  onCopyListChanged(): Observable<void> {
    return this.bookListSubject.asObservable();
  }

deleteBookCopy(bookId:number):Observable<any>{
  return this.http.put<any>(this.baseUrl+"/books/delete/"+bookId,this.httpOptions);

}
deleteBook(bookCode:number):Observable<any>{
  return this.http.put<any>(this.baseUrl+"/bookDetails/delete/"+bookCode,this.httpOptions);

}

getCopies(bookCode:number):Observable<Book[]>{
return this.http.get<Book[]>(this.baseUrl+"/books/copies/"+bookCode);
}

addCopies(amount:number,body:BookDetails):Observable<any>{
  return this.http.post<any>(this.baseUrl+"/books/addBook/"+amount,body,this.httpOptions);
}



}
