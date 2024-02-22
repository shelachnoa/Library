import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToptenListComponent } from './topten-list.component';

describe('ToptenListComponent', () => {
  let component: ToptenListComponent;
  let fixture: ComponentFixture<ToptenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToptenListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToptenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
