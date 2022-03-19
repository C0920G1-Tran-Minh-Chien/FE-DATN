import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportListDrugComponent } from './import-list-drug.component';

describe('ImportListDrugComponent', () => {
  let component: ImportListDrugComponent;
  let fixture: ComponentFixture<ImportListDrugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportListDrugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportListDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
