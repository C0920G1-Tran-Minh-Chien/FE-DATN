import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicativeListComponent } from './indicative-list.component';

describe('IndicativeListComponent', () => {
  let component: IndicativeListComponent;
  let fixture: ComponentFixture<IndicativeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicativeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicativeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
