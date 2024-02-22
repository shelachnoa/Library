import { Component } from '@angular/core';
import { Publisher } from '../schemas/Publisher';
import { NgForm} from '@angular/forms';
import { NgFor } from '@angular/common';
import { PublishersService } from '../publishers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-add-publisher',
  templateUrl: './add-publisher.component.html',
  styleUrl: './add-publisher.component.css',
  standalone:true,
  imports:[
    NgFor,
    MaterialModule
  ]
})
export class AddPublisherComponent {
constructor(private publishersService:PublishersService,private snackbar:MatSnackBar){}
body:Publisher={
  id:0,
  deleted:false,
  name:null
}
addPublisher(event: Event,form:NgForm): void {
  event.preventDefault();
  this.publishersService.addPublisher(this.body).subscribe((res)=>{
    this.openSnackBar(res.message, 'Dismiss', { duration: 2000 });
    this.publishersService.notifypublishersListChanged();  
  },
  (error)=>{
    this.openSnackBar(error.error.message, 'Dismiss', { duration: 2000 });

  });
 

form.resetForm();

}

openSnackBar(message: string, action: string, duration: any): void {
  this.snackbar.open(message, action, duration);
}

}
