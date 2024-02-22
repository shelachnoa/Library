import { Component, Input, input } from '@angular/core';
import { Book } from '../schemas/Book';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-topten',
  templateUrl: './topten.component.html',
  styleUrl: './topten.component.css',
  standalone:true,
  imports:[MaterialModule]
  
})
export class ToptenComponent {

@Input()book?:any;

ngOnInit(){
  console.log(this.book);
  
}

}
