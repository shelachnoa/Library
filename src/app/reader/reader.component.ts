import { Component, Input } from '@angular/core';
import { Reader } from '../schemas/Reader';
import { ReadersService } from '../readers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.css',
  standalone:true,
  imports:[
    MaterialModule
  ]
})
export class ReaderComponent {
@Input()reader?:Reader;

constructor(private readersService:ReadersService,private snackbar:MatSnackBar){}
deleteReader():void{
  this.readersService.deleteReader(this.reader?.id!).subscribe((res)=>{
    this.openSnackBar(res.message,'Dismiss',{duration:2000});

    this.readersService.notifyreaderListChanged();
    
  },
  (error)=>{
    this.openSnackBar(error.error.message,'Dismiss',{duration:2000});

  })
}
openSnackBar(message: string, action: string, duration: any): void {
  this.snackbar.open(message, action, duration);
}

}
