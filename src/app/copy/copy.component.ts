import { Component, Input } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { Book } from '../schemas/Book';
import { BooksService } from '../books.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrl: './copy.component.css',
  standalone:true,
  imports:[MaterialModule]
})
export class CopyComponent {
@Input() copy?:Book;
constructor(private bookService:BooksService, private snackbar:MatSnackBar){}


deleteCopy(copyId:number):void{
this.bookService.deleteBookCopy(copyId).subscribe((res)=>{
  this.openSnackBar(res.message,'DISMISS',2000);
  this.bookService.notifyCopyListChanged();
},
(error)=>{
  this.openSnackBar(error.error.message,'DISMISS',2000);
})
}


openSnackBar(message: string, action: string, duration: any): void {
  this.snackbar.open(message, action, duration);
}

}
