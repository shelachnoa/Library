import { Injectable } from '@angular/core';
import { Publisher } from './schemas/Publisher';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BookDetails } from './schemas/BookDetails';
import html2pdf from 'html2pdf.js'; 

@Injectable({
  providedIn: 'root'
})
export class PublishersService {

  httpOptions={
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  } 
  private publishersListSubject = new Subject<void>();

  private baseUrl:string="http://localhost:8080";
  constructor(private http:HttpClient) { }

  getPublishers(): Observable<Publisher[]> {
    const res= this.http.get<Publisher[]>(this.baseUrl+"/publishers");
    return res;
   
 }

 addPublisher(body:Publisher):Observable<any>{
  const res= this.http.post<any>(this.baseUrl+"/publishers/addPublisher",body,this.httpOptions)
  return res;
}

generateReport(publisherId:number):Observable<BookDetails[]>{
  return this.http.get<BookDetails[]>(this.baseUrl+'/publishers/report/'+publisherId);
}
downloadPDF(content:string,publisherName:string) {
  // const content = this.pdfContent.nativeElement;

  // For jsPDF
  html2pdf().from(content).save(publisherName+'-report.pdf');

  // For html2pdf.js
  // html2pdf().from(content).save('your-file-name.pdf');
}

deletePublisher(publisherId:number):Observable<any>{
  return this.http.put<any>(this.baseUrl+'/publishers/delete/'+publisherId,this.httpOptions);

}

notifypublishersListChanged(): void {
  this.publishersListSubject.next();
}

// Subscribe to this method to get notified when the book list changes
onpublishersListChanged(): Observable<void> {
  return this.publishersListSubject.asObservable();
}
}
