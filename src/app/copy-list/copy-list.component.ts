import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { Book } from '../schemas/Book';
import { BooksService } from '../books.service';
import { CopyComponent } from '../copy/copy.component';
import { NgFor, NgIf } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { publishFacade } from '@angular/compiler';
import { BookDetails } from '../schemas/BookDetails';

@Component({
  selector: 'app-copy-list',
  templateUrl: './copy-list.component.html',
  styleUrl: './copy-list.component.css',
  standalone:true,
  imports:[MaterialModule,CopyComponent,NgFor,NgIf,]
})
export class CopyListComponent {
copies:Book[]=[];
bookCode:number=0;
book!:BookDetails;



constructor(private bookServics:BooksService, @Inject(MAT_DIALOG_DATA) public data:any,private dialogRef: MatDialogRef<CopyListComponent>){}
ngOnInit(){
this.bookCode=this.data.bookCode;
this.book=this.data.book;
this.getCopies(this.bookCode);
this.bookServics.onCopyListChanged().subscribe(()=>{
  this.getCopies(this.bookCode);
  if (this.copies.length === 1) {
    // Close the dialog when copies.length is 0
    this.dialogRef.close();
  }
  
})
}

getCopies(bookCode:number):void{
  this.bookServics.getCopies(bookCode).subscribe((res)=>{
    this.copies=res;
  })
}


}
