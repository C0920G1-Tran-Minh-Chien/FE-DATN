import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManufacturerShowComponent } from './manufacturer-show.component';



describe('ManufacturerShowComponent', () => {
  let component: ManufacturerShowComponent;
  let fixture: ComponentFixture<ManufacturerShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
