import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseImportInvoiceInformationComponent } from './warehouse-import-invoice-information.component';

describe('WarehouseImportInvoiceInformationComponent', () => {
  let component: WarehouseImportInvoiceInformationComponent;
  let fixture: ComponentFixture<WarehouseImportInvoiceInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseImportInvoiceInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseImportInvoiceInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
