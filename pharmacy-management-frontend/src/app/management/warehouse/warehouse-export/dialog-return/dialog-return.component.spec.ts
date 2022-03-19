import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReturnComponent } from './dialog-return.component';

describe('DialogReturnComponent', () => {
  let component: DialogReturnComponent;
  let fixture: ComponentFixture<DialogReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
