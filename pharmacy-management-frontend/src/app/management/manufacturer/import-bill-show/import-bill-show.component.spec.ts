import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportBillShowComponent } from './import-bill-show.component';




describe('ImportBillShowComponent', () => {
  let component: ImportBillShowComponent;
  let fixture: ComponentFixture<ImportBillShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportBillShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBillShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
