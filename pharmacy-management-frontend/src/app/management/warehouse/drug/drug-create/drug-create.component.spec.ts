import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugCreateComponent } from './drug-create.component';

describe('DrugCreateComponent', () => {
  let component: DrugCreateComponent;
  let fixture: ComponentFixture<DrugCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
