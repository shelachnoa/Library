import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { BookDetails } from '../schemas/BookDetails';
import { BooksService } from '../books.service';
import { BookCategory } from '../schemas/BookCategory';
import { NgFor, NgIf } from '@angular/common';
import { Publisher } from '../schemas/Publisher';
import { HttpClient } from '@angular/common/http';
import { PublishersService } from '../publishers.service';
import { AddPublisherComponent } from '../add-publisher/add-publisher.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../material/material.module';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
  standalone: true,
  imports: [
    NgFor,
    AddPublisherComponent,
    NgIf,
    MaterialModule
  ]
})

export class AddBookComponent {
  addPublisherVisibility: boolean = false;
  bookCategories: string[] = Object.values(BookCategory);
  publishers: Publisher[] = [];
  body: BookDetails = {
    code: 0,
    bookName: null,
    category: null,
    author: null,
    deleted: false,
    price: null,
    publisherId: null,
    image: null,
    numOfCopies: 1

  }
  constructor(private booksService: BooksService, private http: HttpClient, private publishersService: PublishersService, private snackBar: MatSnackBar, private publisherDialog: MatDialog) {
  }

  addBook(event: Event, form: NgForm): void {
    event.preventDefault();
    // console.log(this.body);
    if (this.body.numOfCopies <= 0) {
      this.openSnackBar("Illegal copies number", 'Dismiss', { duration: 2000 });
      return;
    }

    this.booksService.addBook(this.body).subscribe((res) => {
      if (res.body !== null) {
        this.openSnackBar(res.message, 'Dismiss', { duration: 2000 });
        this.booksService.notifyBookListChanged();
      }
    },
      (error) => {

        this.openSnackBar(error.error.message, 'Dismiss', { duration: 2000 });

      }
    );

    form.resetForm();

  }
  getPublishers(): void {
    this.publishersService.getPublishers().subscribe((res) => {
      this.publishers = res;
    })
  }
  selectCategory(category: string): void {
    this.body.category = category;
  }
  selectPublisher(publisher: Publisher): void {
    this.body.publisherId = publisher;
  }

  toggleAddPublisherVisibility(): void {
    this.addPublisherVisibility = !this.addPublisherVisibility;
  }
  ngOnInit() {
    this.getPublishers();
    this.publishersService.onpublishersListChanged().subscribe(() => {
      this.getPublishers();
    });

  

  }


  displayPublisher(subject:any){
    return subject? subject.name : undefined;
  }
  openSnackBar(message: string, action: string, duration: any): void {
    this.snackBar.open(message, action, duration);
  }
  openPublisherDialog(): void {
    this.publisherDialog.open(AddPublisherComponent);
  }

}
