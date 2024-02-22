import { Component } from '@angular/core';
import { Borrowing } from '../schemas/Borrowing';
import { BorrowingsService } from '../borrowings.service';
import { NgForm } from '@angular/forms';
import { Book } from '../schemas/Book';
import { DatePipe, NgFor } from '@angular/common';
import { BooksService } from '../books.service';
import { ReadersService } from '../readers.service';
import { Reader } from '../schemas/Reader';
import { MaterialModule } from '../material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-borrowing',
  templateUrl: './add-borrowing.component.html',
  styleUrl: './add-borrowing.component.css',
  standalone: true,
  imports: [
    NgFor,
    MaterialModule,
    DatePipe
  ]
})
export class AddBorrowingComponent {
  books: Book[] = [];
  readers: Reader[] = [];
  body: Borrowing = {
    id: 0,
    readerId: null,
    bookId: null,
    borrowedDate: new Date(),
    returnedDate: null,

  }
  constructor(private booksService: BooksService, private borrowingsService: BorrowingsService, private readersService: ReadersService, private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.getUnBorrowedBooks();
    this.getReaders();
  }
  addBorrowing(event: Event, form: NgForm): void {
    event.preventDefault();
    this.body.borrowedDate.setHours(0,0,0,0);
    this.borrowingsService.addBorrowing(this.body).subscribe((res) => {
      this.borrowingsService.notifyBorrowingListChanged();
      this.openSnackBar(res.message, 'Dismiss', { duration: 2000 });
    },
      (error) => {
        this.openSnackBar(error.error.message, 'Dismiss', { duration: 2000 });
      });
    form.resetForm();


  }
  selectBook(selectedBook: Book): void {
    this.body.bookId = selectedBook;
    console.log("on selected book");
    console.log({ selectedBook });

  }

  selectReader(selectedReader: Reader): void {
    this.body.readerId = selectedReader;
  }

  getUnBorrowedBooks(): void {
    this.booksService.getUnBorrowedBooks().subscribe((res) => {
      this.books = res;
      this.books.forEach((book)=>{
      })
      
    })
  }

  getReaders(): void {
    this.readersService.getReaders().subscribe((res) => {
      this.readers = res;

    })
  }
  openSnackBar(message: string, action: string, duration: any): void {
    this.snackBar.open(message, action, duration);
  }
 

}

