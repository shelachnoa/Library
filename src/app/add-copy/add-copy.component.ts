import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookDetails } from '../schemas/BookDetails';
import { BooksService } from '../books.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-copy',
  templateUrl: './add-copy.component.html',
  styleUrl: './add-copy.component.css',
  standalone:true,
  imports:[MaterialModule]
})
export class AddCopyComponent {

numOfCopies:number=0;

constructor(private booksService:BooksService,@Inject(MAT_DIALOG_DATA)public data:BookDetails,private snackbar:MatSnackBar){}
addCopies():void{
this.booksService.addCopies(this.numOfCopies,this.data).subscribe((res)=>{
  this.openSnackBar(res.message, 'Dismiss', { duration: 2000 });
  this.booksService.notifyBookListChanged();
  
},
(error)=>{
  this.openSnackBar(error.error.message, 'Dismiss', { duration: 2000 });
  
})
}

openSnackBar(message: string, action: string, duration: any): void {
  this.snackbar.open(message, action, duration);
}


}
