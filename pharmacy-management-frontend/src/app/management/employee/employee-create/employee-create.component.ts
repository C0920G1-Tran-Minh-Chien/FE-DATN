import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../../service/employee.service';
import {Router} from '@angular/router';
import {Employee} from '../../../model/employee';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})

export class EmployeeCreateComponent implements OnInit {
  employeeForm: FormGroup;
  employee: Employee;
  selectedImage: any = null;
  positionArr: Position [];

  constructor(private employeeService: EmployeeService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private toastr: ToastrService) {
  }


  validationMessage = {
    employeeName: [
      {type: 'required', message: 'Trường này không được để trống.'},
      {type: 'minlength', message: 'Nhập tối thiểu 6 ký tự.'}
    ],
    employeeAddress: [
      {type: 'required', message: 'Trường này không được để trống.'},
      {type: 'minlength', message: 'Nhập tối thiểu 6 ký tự.'}
    ],
    employeePhone: [
      {type: 'required', message: 'Trường này không được để trống.'}
    ],
    employeeStartDate: [
      {type: 'required', message: 'Trường này không được để trống.'}
    ],
    accountName: [
      {type: 'required', message: 'Trường này không được để trống.'},
      {type: 'minlength', message: 'Nhập tối thiểu 6 ký tự.'},
      {type: 'maxlength', message: 'Nhập tối đa 50 ký tự.'}
    ],
    employeeNote: [
      {type: 'maxlength', message: 'Nhập tối đa 250 ký tự.'}
    ],
  };

  ngOnInit(): void {
    this.validate();

  }

  validate(): void {
    this.employeeForm = new FormGroup({
        employeeName: new FormControl('', [Validators.required, Validators.minLength(6)]),
        employeeAddress: new FormControl('', [Validators.required, Validators.minLength(6)]),
        employeeImage: new FormControl(),
        employeePhone: new FormControl('', Validators.required),
        employeeNote: new FormControl('', Validators.maxLength(250)),
        employeeStartDate: new FormControl('', Validators.required),
        position: new FormControl(),
        accountName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)])
      }
    );
  }


  addNewEmployee() {

    const nameImg = this.getCurrentDateTime() + this.selectedImage?.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {

          this.employeeForm.patchValue({employeeImage: url});
          // Call API to create
          this.employee = this.employeeForm.value;
          this.employeeService.saveEmployee(this.employee).subscribe(() => {

            this.router.navigateByUrl('/employee').then(s => this.showSuccess());
          }, e => {
            this.showError();
          });
        });
      })
    ).subscribe();
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showSuccess() {
    this.toastr.success('Thêm mới thành công !', 'Thông báo : ');
  }

  showError() {
    this.toastr.error('Thêm mới thất bại !', 'Cảnh báo : ');
  }
}
// upload image to firebase
