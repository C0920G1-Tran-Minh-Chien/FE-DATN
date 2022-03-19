import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionCreateComponent } from './prescription-create.component';

describe('PrescriptionCreateComponent', () => {
  let component: PrescriptionCreateComponent;
  let fixture: ComponentFixture<PrescriptionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
