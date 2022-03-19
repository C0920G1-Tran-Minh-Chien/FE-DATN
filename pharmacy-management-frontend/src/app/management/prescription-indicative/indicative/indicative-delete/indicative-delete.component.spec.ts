import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicativeDeleteComponent } from './indicative-delete.component';

describe('IndicativeDeleteComponent', () => {
  let component: IndicativeDeleteComponent;
  let fixture: ComponentFixture<IndicativeDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicativeDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicativeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
