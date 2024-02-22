import { Component } from '@angular/core';
import { Reader } from '../schemas/Reader';
import { ReadersService } from '../readers.service';
import { NgForm } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styleUrl: './add-reader.component.css',
  standalone:true,
  imports:[
    MaterialModule
  ]
})
export class AddReaderComponent {
body:Reader={
id:0,
fullName:null,
deleted:false,
email:null
}

constructor(private readerService:ReadersService,private snackBar:MatSnackBar){}

addReader(event: Event,form:NgForm): void {
  event.preventDefault();
  console.log(this.body);
  this.readerService.addReader(this.body).subscribe((res)=>{
    this.readerService.notifyreaderListChanged();  
this.openSnackBar(res.message,'Dissmis',{duration:2000})
  },
  (error)=>{
    this.openSnackBar(error.error.message,'Dissmis',{duration:2000})

  });
form.resetForm();
}

openSnackBar(message:string,action:string,duration:any){
  this.snackBar.open(message,action,duration);
}

}
