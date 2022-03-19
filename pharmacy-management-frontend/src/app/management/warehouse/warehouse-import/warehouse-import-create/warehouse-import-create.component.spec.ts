import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseImportCreateComponent } from './warehouse-import-create.component';

describe('WarehouseImportCreateComponent', () => {
  let component: WarehouseImportCreateComponent;
  let fixture: ComponentFixture<WarehouseImportCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseImportCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseImportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
