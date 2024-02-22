import { Component, Input } from '@angular/core';
import { Borrowing } from '../schemas/Borrowing';
import { BorrowingsService } from '../borrowings.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { DatePipe, NgIf } from '@angular/common';
import { ReaderComponent } from '../reader/reader.component';
import { BookComponent } from '../book/book.component';
import { MaterialModule } from '../material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-borrowing',
  templateUrl: './borrowing.component.html',
  styleUrl: './borrowing.component.css',
  standalone: true,
  imports: [
    MatExpansionPanel,
    DatePipe,
    ReaderComponent,
    BookComponent,
    NgIf,
    MaterialModule
  ]
})

export class BorrowingComponent {
  @Input() borrowing?: Borrowing;
  delayDays: number = 0;
  panelOpenState: boolean = false;


  constructor(private borrowingsService: BorrowingsService,private snackBar: MatSnackBar) { }
  ngOnInit() {
    // this.calculateDelayDays();
  }

  returnBook(): void {
    this.borrowingsService.returnBook(this.borrowing?.id).subscribe((res) => {
      this.borrowingsService.notifyBorrowingListChanged();
      this.openSnackBar(res.message, 'Dismiss', { duration: 2000 });
    })
  }
  // calculateDelayDays(): void {
  //   if (this.borrowing?.borrowedDate) {
  //     const borrowedDate = new Date(this.borrowing.borrowedDate);
  //     const currentDate = new Date();
  //     const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  //     const differenceInMilliseconds = currentDate.getTime() - borrowedDate.getTime();
  //     const delayDays = Math.floor(differenceInMilliseconds / millisecondsPerDay);

  //     this.delayDays = Math.max(delayDays - 14, 0); // Calculate delay days, but no negative values
  //   }
  // }

  openSnackBar(message: string, action: string, duration: any): void {
    this.snackBar.open(message, action, duration);
  }
 
}
