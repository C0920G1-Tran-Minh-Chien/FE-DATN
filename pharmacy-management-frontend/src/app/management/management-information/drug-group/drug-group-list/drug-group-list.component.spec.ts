import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugGroupListComponent } from './drug-group-list.component';

describe('DrugGroupListComponent', () => {
  let component: DrugGroupListComponent;
  let fixture: ComponentFixture<DrugGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
