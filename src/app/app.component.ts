import { Component } from '@angular/core';
import { BookListComponent } from './book-list/book-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Library';
  constructor(private router:Router){}
  // navigateToBooks() {
  //   this.router.navigate(['/books']);
  // }
}
