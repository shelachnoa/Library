import { Component } from '@angular/core';
import { Book } from '../schemas/Book';
import { BorrowingsService } from '../borrowings.service';
import { NgFor } from '@angular/common';
import { ToptenComponent } from '../topten/topten.component';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-topten-list',
  templateUrl: './topten-list.component.html',
  styleUrl: './topten-list.component.css',
  standalone:true,
  imports:[
    NgFor,
    ToptenComponent,
    MaterialModule
  ]
})
export class ToptenListComponent {

  topten: any[] = []

  constructor(private borrowingsService: BorrowingsService) { }
  ngOnInit() {
    this.getTopTen();
  }

  getTopTen(): void {
    this.borrowingsService.getTopTen().subscribe((res:any[]) => {      
      this.topten = res;
    })
  }

}
