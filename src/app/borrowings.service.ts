import { Injectable } from '@angular/core';
import { Borrowing } from './schemas/Borrowing';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from './schemas/Book';

@Injectable({
  providedIn: 'root'
})
export class BorrowingsService {
  private baseUrl:string="http://localhost:8080";
  private borrowingsListSubject = new Subject<void>();


  httpOptions={
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private http:HttpClient) { }

getBorrowings():Observable<Borrowing[]>{
  this.http.get<Borrowing[]>(this.baseUrl+"/borrowings").subscribe((res)=>console.log({res})
  )
return this.http.get<Borrowing[]>(this.baseUrl+"/borrowings");

}
getOldBorrowings():Observable<Borrowing[]>{
  return this.http.get<Borrowing[]>(this.baseUrl+"/borrowings/archive");
}
addBorrowing(body:Borrowing):Observable<any>{
  const res= this.http.post<any>(this.baseUrl+"/borrowings/addBorrowing",body,this.httpOptions)
  return res;
  
}

returnBook(borrowingId:number|undefined):Observable<any>{
  
  return this.http.put<any>(this.baseUrl+`/borrowings/${borrowingId}`,this.httpOptions)
}
notifyBorrowingListChanged(): void {
  this.borrowingsListSubject.next();
}

// Subscribe to this method to get notified when the book list changes
onBorrowingListChanged(): Observable<void> {
  return this.borrowingsListSubject.asObservable();
}
getTopTen():Observable<any[]>{
  return this.http.get<any[]>(this.baseUrl+'/borrowings/topTen');
}

searchBorrowingByBookCode(searchTerm:string):Observable<Borrowing[]>{
return this.http.get<Borrowing[]>(this.baseUrl+`/borrowings/searchByBookCode/`+searchTerm);
}

searchBorrowingByReaderName(readerName:string):Observable<Borrowing[]>{
  return this.http.get<Borrowing[]>(this.baseUrl+"/borrowings/searchByReaderName/"+readerName);
 
}


serachBorrowingByBorrowDate(date:string):Observable<Borrowing[]>{

  return this.http.get<Borrowing[]>(this.baseUrl+"/borrowings/searchByBorrowDate/"+date);

}
}
