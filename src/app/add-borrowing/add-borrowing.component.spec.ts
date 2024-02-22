import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBorrowingComponent } from './add-borrowing.component';

describe('AddBorrowingComponent', () => {
  let component: AddBorrowingComponent;
  let fixture: ComponentFixture<AddBorrowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBorrowingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBorrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
