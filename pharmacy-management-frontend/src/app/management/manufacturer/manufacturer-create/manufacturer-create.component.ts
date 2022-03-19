
import { Component, OnInit } from '@angular/core';
import {ManufacturerService} from "../../../service/manufacturer.service";
import {FormControl, FormGroup, Validators,AbstractControl} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Manufacturer} from "../../../model/manufacturer";
import {MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-manufacturer-create',
  templateUrl: './manufacturer-create.component.html',
  styleUrls: ['./manufacturer-create.component.css']
})
export class ManufacturerCreateComponent implements OnInit {

manufacturerForm: FormGroup;


  constructor(private  manufacturerService: ManufacturerService, private toastr:ToastrService,public dialogRef: MatDialogRef<ManufacturerCreateComponent>) {
    this.manufacturerForm= new FormGroup(
    {
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
      this.manufacturerService.saveManufacturer(manufacturer).subscribe(  () => {
          this.toastr.success("Thêm mới thành công.", 'Thêm mới')
        this.dialogRef.close(manufacturer);
        },error => {
        if(error.status==404){
          this.toastr.error("Thêm mới thất bại vì trường email hoặc trường mã nhà cung cấp bị trùng.", 'Thêm mới')
        }else if(error.status==304)
          this.toastr.error("Thêm mới thất bại.", 'Thêm mới')
        }
      );
    } else {
      this.toastr.error("Thêm mới thất bại.", 'Thêm mới')
    }
  }

  closeDB() {
    this.dialogRef.close();
  }
}
