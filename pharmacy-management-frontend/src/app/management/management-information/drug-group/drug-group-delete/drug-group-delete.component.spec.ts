import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugGroupDeleteComponent } from './drug-group-delete.component';

describe('DrugGroupDeleteComponent', () => {
  let component: DrugGroupDeleteComponent;
  let fixture: ComponentFixture<DrugGroupDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugGroupDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugGroupDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
