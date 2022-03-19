import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugNotificationComponent } from './drug-notification.component';

describe('DrugNotificationComponent', () => {
  let component: DrugNotificationComponent;
  let fixture: ComponentFixture<DrugNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
