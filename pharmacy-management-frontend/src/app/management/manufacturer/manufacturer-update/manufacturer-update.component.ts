import {Component, Inject, OnInit} from '@angular/core';
import {ManufacturerService} from "../../../service/manufacturer.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Manufacturer } from 'src/app/model/manufacturer';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-manufacturer-update',
  templateUrl: './manufacturer-update.component.html',
  styleUrls: ['./manufacturer-update.component.css']
})
export class ManufacturerUpdateComponent implements OnInit {
  manufacturer: Manufacturer;
  manufacturerForm: FormGroup;

  constructor(private manufacturerService: ManufacturerService, @Inject(MAT_DIALOG_DATA) public data,private  toastr:ToastrService) {
    this.manufacturerService.findByIdManufacture(data.id).subscribe(manufacturer => {
      this.manufacturer = manufacturer;
      console.log(this.manufacturer);
      this.manufacturerForm.patchValue(this.manufacturer);
    });
    this.manufacturerForm = new FormGroup(
      {
        manufacturerId: new FormControl('',[Validators.required]),
        manufacturerCode: new FormControl('',[Validators.required,Validators.pattern(/^NCC-[a-zA-Z]{1,20}$/)]),
        manufacturerName :new FormControl('',[Validators.required,Validators.pattern(/^[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]+([ ][A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]+)+/)]),
        manufacturerAddress :new FormControl('',[Validators.required,Validators.pattern(/^[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]+([ ][A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ][a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]+)+$/)]),
        manufacturerEmail :new FormControl('',[Validators.required,Validators.email]),
        manufacturerPhoneNumber :new FormControl('',[Validators.required,Validators.pattern(/^\+84[0-9]{8,9}|0[0-9]{8,9}$/)]),
        manufacturerNote:new FormControl('',[Validators.required]),
        manufacturerDebts:new FormControl(0.0),
        flag:new FormControl(1),
      }
    )
  }

  ngOnInit(): void {

  }

  submit() {
    if (this.manufacturerForm.valid) {
      const manufacturer = this.manufacturerForm.value;
      console.log(manufacturer);
      this.manufacturerService.updateManufacturer(manufacturer.manufacturerId,manufacturer).subscribe(
        () => {
          this.toastr.success("Chỉnh sửa thành công.", 'Chỉnh sửa')
          window.location.reload();
        },error => {
            this.toastr.error("Chỉnh sửa thất bại vì trường email hoặc trường mã nhà cung cấp bị trùng.", 'Chỉnh sửa')
        }

      );



    } else {
      this.toastr.error("Chỉnh sửa thất bại.", 'Chỉnh sửa')
    }
  }
}
