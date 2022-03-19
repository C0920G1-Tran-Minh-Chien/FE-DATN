import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseImportPaymentComponent } from './warehouse-import-payment.component';

describe('WarehouseImportPaymentComponent', () => {
  let component: WarehouseImportPaymentComponent;
  let fixture: ComponentFixture<WarehouseImportPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseImportPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseImportPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
