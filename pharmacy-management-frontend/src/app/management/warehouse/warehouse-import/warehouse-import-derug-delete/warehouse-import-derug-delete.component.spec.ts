import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseImportDerugDeleteComponent } from './warehouse-import-derug-delete.component';

describe('WarehouseImportDerugDeleteComponent', () => {
  let component: WarehouseImportDerugDeleteComponent;
  let fixture: ComponentFixture<WarehouseImportDerugDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseImportDerugDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseImportDerugDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
