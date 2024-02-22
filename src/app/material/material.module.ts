import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


const Material=[
  MatButtonModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatDividerModule,
  MatTableModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSelectModule,
  FormsModule,
  MatInputModule,
  ReactiveFormsModule,
  MatCardModule,
  MatBadgeModule,
  MatListModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatIconModule,
  MatTabsModule,
  MatAutocompleteModule
  
];


@NgModule({
  imports: [Material],
  exports:[Material]
})
export class MaterialModule { }
