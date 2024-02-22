import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Publisher } from '../schemas/Publisher';
import { BookDetails } from '../schemas/BookDetails';
import { PublishersService } from '../publishers.service';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrl: './publisher.component.css',
  standalone: true,
  imports: [
    NgIf,
    MaterialModule
  ]
})
export class PublisherComponent {
  @Input() publisher?: Publisher;
  books: BookDetails[] = [];
  displayedColumns: string[] = ['position', 'name', 'author', 'price','amount'];
  displayReport: boolean = false;
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  total: number = 0;

  constructor(private publishersService: PublishersService,private snackbar:MatSnackBar) { }
  // selectedPublisher!:Publisher;

  async generateReport(publisher: Publisher): Promise<void> {
    try {
      this.displayReport = true;
      const returnedBooks: BookDetails[] | undefined = await this.publishersService.generateReport(publisher.id).toPromise();
      if (returnedBooks !== undefined)
        this.books = returnedBooks;
      console.log({ returnedBooks });
      const totalPrice: number = this.books.reduce((sum, book) => sum + (book.price || 0)*book.numOfCopies, 0);
      console.log({totalPrice});
      
     this.total = parseFloat(totalPrice.toFixed(2));
    }
    catch (error) {
      console.log(error);

    }
    // Your logic to generate the report goes here
    // You can use this.selectedPublisher to access the selected publisher


  }

  closeReport(): void {
    this.displayReport = false;
  }

  downloadPDF(): void {
    const content = this.pdfContent.nativeElement;
    this.publishersService.downloadPDF(content,this.publisher?.name!);
  }
  deletePublisher(): void {
    this.publishersService.deletePublisher(this.publisher?.id!).subscribe((res) => {
      this.openSnackBar(res.message,'Dismiss',{duration:2000});
      this.publishersService.notifypublishersListChanged();


    },
    (error)=>{
      this.openSnackBar(error.error.message,'Dismiss',{duration:2000});

    })
  }

  openSnackBar(message: string, action: string, duration: any): void {
    this.snackbar.open(message, action, duration);
  }
  
}
