import { Component } from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from '../schemas/Book';
import { BookComponent } from '../book/book.component';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from '../add-book/add-book.component';
import { PageEvent } from '@angular/material/paginator';
import { MaterialModule } from '../material/material.module';
import { BookDetails } from '../schemas/BookDetails';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [
    BookComponent,
    NgFor,
    AddBookComponent,
    NgIf,
    MaterialModule

  ]
})

export class BookListComponent {
  books: BookDetails[] = [];
  private searchTimer: any;
  displayedBooks: BookDetails[] = [];
  pageSizeOptions = [12];
  currentPage = 1;
  itemsPerPage = 12;
  constructor(private bookService: BooksService, public addBookDialog: MatDialog) {   }

   getBooks(): void {
    //  const temp = await (await this.bookService.getBookList()).toPromise();
     this.bookService.getBookList().subscribe((res)=>{
      this.books=res;
      this.updateDisplayedBooks();

     })
    

  }
  openAddBookDialog(): void {
    this.addBookDialog.open(AddBookComponent);
  }
  ngOnInit(): void {
    this.getBooks();
    this.bookService.onBookListChanged().subscribe(() => {
      this.getBooks(); // Update the books when notified
    });

   

   
    

  }

  searchBookByName(searchTerm: string): void {
    
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(async () => {
      try {
        const result = await this.bookService.searchBookByName(searchTerm).toPromise();
        console.log(result);
        if (result !== undefined) {
          this.displayedBooks = result;

        }
        if (searchTerm == '') {
          this.getBooks();
        }
        if (!result?.length) {
          console.log("book not found");

        }

      }
      catch (err) {
        console.error(err);

      }
    }, 300)
  }
  updateDisplayedBooks(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedBooks = this.books.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.updateDisplayedBooks();
  }
}
