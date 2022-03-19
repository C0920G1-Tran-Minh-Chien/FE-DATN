import {Component, Inject, OnInit} from '@angular/core';
import {ManufacturerService} from "../../../service/manufacturer.service";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Manufacturer} from "../../../model/manufacturer";
import {FormControl, FormGroup} from "@angular/forms";
import {Toast, ToastrModule, ToastrService} from "ngx-toastr";
import {timeout} from "rxjs/operators";

@Component({
  selector: 'app-manufacturer-delete',
  templateUrl: './manufacturer-delete.component.html',
  styleUrls: ['./manufacturer-delete.component.css']
})
export class ManufacturerDeleteComponent implements OnInit {
  manufacturer: Manufacturer;
  manufacturerForm: FormGroup;

  constructor(private manufacturerService: ManufacturerService, @Inject(MAT_DIALOG_DATA) public data, private toastr: ToastrService) {
    this.manufacturerService.findByIdManufacture(data.id).subscribe(manufacturer => {
      this.manufacturer = manufacturer;
      console.log(this.manufacturer);
      this.manufacturerForm.patchValue(this.manufacturer);
    });
    this.manufacturerForm = new FormGroup(
      {
        manufacturerId: new FormControl(''),
        manufacturerCode: new FormControl(''),
        manufacturerName: new FormControl(''),
        manufacturerAddress: new FormControl(''),
        manufacturerEmail: new FormControl(''),
        manufacturerPhoneNumber: new FormControl(''),
        manufacturerNote: new FormControl(''),
        manufacturerDebts: new FormControl(0.0),
        flag: new FormControl('')
      }
    )
  }

  ngOnInit(): void {
  }

  delete() {
      this.manufacturerForm.get('flag').setValue(0);
      const manufacturer = this.manufacturerForm.value;
      this.manufacturerService.deleteManufacturer(manufacturer.manufacturerId, manufacturer).subscribe(() => {
          this.toastr.success("Xóa thành công.", 'Xóa')
        },error => {
          this.toastr.error("Xóa thất bại.", 'Xóa')
        }
      );
  }
}
