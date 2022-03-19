import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceDeleteComponent } from './sales-invoice-delete.component';

describe('SalesInvoiceDeleteComponent', () => {
  let component: SalesInvoiceDeleteComponent;
  let fixture: ComponentFixture<SalesInvoiceDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesInvoiceDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesInvoiceDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
