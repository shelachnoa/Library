import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Reader } from './schemas/Reader';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReadersService {

  httpOptions={
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  private readersListSubject = new Subject<void>();


  constructor(private http:HttpClient) { }
private baseUrl="http://localhost:8080";
  getReaders():Observable<Reader[]>{
    return this.http.get<Reader[]>(this.baseUrl+"/readers");

  }
  addReader(body:Reader):Observable<any>{
    const res= this.http.post<any>(this.baseUrl+"/readers/addReader",body,this.httpOptions)
   return res;
  
  }
  deleteReader(readerId:number):Observable<any>{
    return this.http.put<any>(this.baseUrl+"/readers/delete/"+readerId,this.httpOptions)
  }
  notifyreaderListChanged(): void {
    this.readersListSubject.next();
  }
  
  // Subscribe to this method to get notified when the book list changes
  onreaderListChanged(): Observable<void> {
    return this.readersListSubject.asObservable();
  }
  
}
