import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicativeCreateComponent } from './indicative-create.component';

describe('IndicativeCreateComponent', () => {
  let component: IndicativeCreateComponent;
  let fixture: ComponentFixture<IndicativeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicativeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicativeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
