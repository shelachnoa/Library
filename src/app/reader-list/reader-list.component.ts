import { Component } from '@angular/core';
import { ReadersService } from '../readers.service';
import { Reader } from '../schemas/Reader';
import { ReaderComponent } from '../reader/reader.component';
import { NgFor } from '@angular/common';
import { AddReaderComponent } from '../add-reader/add-reader.component';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-reader-list',
  templateUrl: './reader-list.component.html',
  styleUrl: './reader-list.component.css',
  standalone:true,
  imports:[
    ReaderComponent,
    NgFor,
    AddReaderComponent,
    MaterialModule
  ]
})

export class ReaderListComponent {
  readers:Reader[]=[];

  constructor(private readersService:ReadersService,public addReaderDialog:MatDialog){}

  async getReaders(): Promise<void> {
    const temp=await this.readersService.getReaders().toPromise();
    if(temp!== undefined){
      this.readers=temp
    }
    console.log(this.readers);
    
     
  }

  openAddReaderDialog():void{
    this.addReaderDialog.open(AddReaderComponent);
  }
  ngOnInit(): void {
this.getReaders();
this.readersService.onreaderListChanged().subscribe(() => {
  this.getReaders(); // Update the books when notified
});


  }
}
