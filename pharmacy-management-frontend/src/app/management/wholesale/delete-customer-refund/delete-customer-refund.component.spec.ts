import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCustomerRefundComponent } from './delete-customer-refund.component';

describe('DeleteCustomerRefundComponent', () => {
  let component: DeleteCustomerRefundComponent;
  let fixture: ComponentFixture<DeleteCustomerRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCustomerRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCustomerRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
