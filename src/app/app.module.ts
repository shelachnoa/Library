import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book/book.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddBookComponent } from './add-book/add-book.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ReaderListComponent } from './reader-list/reader-list.component';
import { ReaderComponent } from './reader/reader.component';
import { AddReaderComponent } from './add-reader/add-reader.component';
import { MaterialModule } from './material/material.module';
import { BorrowingListComponent } from './borrowing-list/borrowing-list.component';
import { BorrowingComponent } from './borrowing/borrowing.component';
import { AddBorrowingComponent } from './add-borrowing/add-borrowing.component';
import { AddPublisherComponent } from './add-publisher/add-publisher.component';
import { ToptenListComponent } from './topten-list/topten-list.component';
import { ToptenComponent } from './topten/topten.component';
import { PublisherListComponent } from './publisher-list/publisher-list.component';
import { PublisherComponent } from './publisher/publisher.component';
import { CopyListComponent } from './copy-list/copy-list.component';
import { CopyComponent } from './copy/copy.component';
import { AddCopyComponent } from './add-copy/add-copy.component';

const appRoutes: Routes = [
  {path: 'books', component: BookListComponent},
  {path: 'readers', component: ReaderListComponent},
  {path: 'borrowings', component: BorrowingListComponent},
  {path: 'topTen',component: ToptenListComponent},
  {path:'publishers', component:PublisherListComponent},
  { path: '**', redirectTo: '/books' } 
];

@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BookListComponent,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    BookComponent,
    AddBookComponent,
    FormsModule,
    ReaderListComponent,
    ReaderComponent,
    AddReaderComponent,
    MaterialModule,
    BorrowingListComponent,
    BorrowingComponent,
    AddBorrowingComponent,
    AddPublisherComponent,
    PublisherListComponent,
    PublisherComponent,
    ToptenListComponent,
    ToptenComponent,
    CopyListComponent,
    CopyComponent,
    AddCopyComponent,
    RouterModule.forRoot(
      appRoutes, { enableTracing: true }
    )
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
