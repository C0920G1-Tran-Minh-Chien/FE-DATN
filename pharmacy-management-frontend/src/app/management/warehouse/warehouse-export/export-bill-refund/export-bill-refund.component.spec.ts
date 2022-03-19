import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBillRefundComponent } from './export-bill-refund.component';

describe('ExportBillRefundComponent', () => {
  let component: ExportBillRefundComponent;
  let fixture: ComponentFixture<ExportBillRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportBillRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportBillRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
