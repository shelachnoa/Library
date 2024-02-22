import { Component, Input } from '@angular/core';
import { Book } from '../schemas/Book';
import { NgIf } from '@angular/common';
import { BooksService } from '../books.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../material/material.module';
import { BookDetails } from '../schemas/BookDetails';
import { MatDialog } from '@angular/material/dialog';
import { CopyListComponent } from '../copy-list/copy-list.component';
import { AddCopyComponent } from '../add-copy/add-copy.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
  standalone:true,
  imports:[
    NgIf,
    MaterialModule,
    CopyListComponent
  ]
})
export class BookComponent {
@Input() book?:BookDetails;
copies:Book[]=[];
numOfCopies:number=0;
constructor(private bookService:BooksService,private snackbar:MatSnackBar, private copiesModal:MatDialog){}

openSnackBar(message: string, action: string, duration: any): void {
  this.snackbar.open(message, action, duration);
}


deleteBook(bookCode:number):void{
  
    this.bookService.deleteBook(this.book?.code!).subscribe((res)=>{
      this.openSnackBar(res.message,'Dismiss',{duration:2000});
      this.bookService.notifyBookListChanged();
    },
    (error)=>{
   
      this.openSnackBar(error.error.message,'Dismiss',{duration:2000});
    });
 
  
  }
 
    
  



getCopies(bookCode:number):void{
 
    this.copiesModal.open(CopyListComponent,{data:{bookCode: bookCode,book:this.book}});

  }

  addCopies():void{
 
    this.copiesModal.open(AddCopyComponent,{data:this.book});

  }
  
}
