import { Component, ViewChild } from '@angular/core';
import { BorrowingsService } from '../borrowings.service';
import { Borrowing } from '../schemas/Borrowing';
import { BorrowingComponent } from '../borrowing/borrowing.component';
import { NgFor, NgIf } from '@angular/common';
import { AddBorrowingComponent } from '../add-borrowing/add-borrowing.component';
import { Book } from '../schemas/Book';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-borrowing-list',
  templateUrl: './borrowing-list.component.html',
  styleUrl: './borrowing-list.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  standalone: true,
  imports: [
    BorrowingComponent,
    NgFor,
    AddBorrowingComponent,
    NgIf,
    MaterialModule
  ]
})
export class BorrowingListComponent {

  books: Book[] = [];
  borrowings: Borrowing[] = [];
  addBtn: boolean = true;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  backBtn: boolean = false;
  displayedBorrowings: Borrowing[] = [];
  @ViewChild("searchBox") searchBox: any;
  private searchTimer: any;


  constructor(private borrowingsService: BorrowingsService, public addBorrowingDialog: MatDialog) { }

  getBorrowings(): void {
    this.borrowingsService.getBorrowings().subscribe((res) => {
      console.log({ res });
      this.borrowings = res;
      this.displayedBorrowings = this.borrowings;
    })
  }

  openAddBorrowingDialog(): void {
    this.addBorrowingDialog.open(AddBorrowingComponent);
  }
  ngOnInit() {
    this.getBorrowings();
    this.borrowingsService.onBorrowingListChanged().subscribe(() => {
      this.getBorrowings(); 
      

          });



  }
  getOldBorrowings(): void {
    this.addBtn = false;
    this.backBtn = true;
    this.borrowingsService.getOldBorrowings().subscribe((res) => {
      this.displayedBorrowings = res;
    })
  }
  toggleBtns(): void {
    this.addBtn = true;
    this.backBtn = false;
    this.getBorrowings();
  }

  searchBorrowingByBookCode(searchTerm: string): void {

    clearTimeout(this.searchTimer);
    console.log({ searchTerm });

    this.searchTimer = setTimeout(async () => {
      try {
        if (searchTerm == '') {
          console.log("search term none");
          this.getBorrowings();
        } else {
          const result = await this.borrowingsService.searchBorrowingByBookCode(searchTerm).toPromise();
          if (result !== undefined) {
            this.displayedBorrowings = result;

          }

          if (!result?.length) {
            console.log("borrowing not found");

          }
        }

      }
      catch (err) {
        console.error(err);

      }
    }, 300)

  }


  searchBorrowingByReaderName(searchTerm: string): void {

    clearTimeout(this.searchTimer);
    console.log({ searchTerm });

    this.searchTimer = setTimeout(async () => {
      try {
        if (searchTerm == '') {
          console.log("search term none");
          this.getBorrowings();
        } else {
          const result = await this.borrowingsService.searchBorrowingByReaderName(searchTerm).toPromise();
          console.log({result});
          
          if (result !== undefined) {
            this.displayedBorrowings = result;

          }

          if (!result?.length) {
            console.log("borrowing not found");

          }
        }

      }
      catch (err) {
        console.error(err);

      }
    }, 300)

  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();

    // Format the date as 'yyyy-MM-dd'
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  searchBorrowingByBorrowDate(date:string): void {

    clearTimeout(this.searchTimer);

    this.searchTimer = setTimeout(async () => {
      try {
        if (!date) {
          console.log("search term none");
          this.getBorrowings();
        } else {
          // const formattedDate=this.formatDate(date);
          const result = await this.borrowingsService.serachBorrowingByBorrowDate(date).toPromise();
          console.log({result});
          
          if (result !== undefined) {
            this.displayedBorrowings = result;

          }

          if (!result?.length) {
            console.log("borrowing not found");

          }
        }

      }
      catch (err) {
        console.error(err);

      }
    }, 300)

  }


}

