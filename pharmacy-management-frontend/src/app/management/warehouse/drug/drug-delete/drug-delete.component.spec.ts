import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugDeleteComponent } from './drug-delete.component';

describe('DrugDeleteComponent', () => {
  let component: DrugDeleteComponent;
  let fixture: ComponentFixture<DrugDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
