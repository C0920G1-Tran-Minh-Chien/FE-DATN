import {Component, OnInit, Pipe} from '@angular/core';
import {EmployeeDeleteComponent} from "../employee-delete/employee-delete.component";
import {Employee} from "../../../model/Employee";
import {EmployeeService} from "../../../service/employee.service";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {DialogComponent} from '../dialog/dialog.component';

@Pipe({
  name: "phone"
})
export class PhonePipe {
  transform(rawNum) {
    rawNum = rawNum.charAt(0) != 0 ? "0" + rawNum : "" + rawNum;

    let newStr = "";
    let i = 0;

    for (; i < Math.floor(rawNum.length / 2) - 1; i++) {
      newStr = newStr + rawNum.substr(i * 2, 2) + " ";
    }

    return newStr + rawNum.substr(i * 2);
  }
}

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  employeeName = "";
  employeeAddress = "";
  employeeCode = "";
  employeePhone = "";
  position = "";
  sortBy = 'employee_id';
  employees: Employee[] = [];
  pages: Array<any> = [];
  page = 0;
  select: any;
  searchValue: any;
  employee: Employee;
  change: number;
  click = true;
  err: boolean;
  employeeColor: number;


  constructor(private employeeService: EmployeeService, private dialog: MatDialog, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['page'] != null) {
        this.page = params['page'] - 1;
      }

      console.log(this.page); // Print the parameter to the console.
    });

  }


  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.findEmployeeByRequest(this.employeeName, this.employeeAddress, this.employeeCode, this.employeePhone, this.position, this.page, this.sortBy).subscribe(employee => {
      if (employee == undefined) {
        this.employees = [];
        this.page = 0;
      }else {
        this.employees = employee['content'];
        this.pages = new Array<any>(employee['totalPages']);
        console.log(this.pages);
        console.log(this.employees);
      }
    });
  }


  setPage(i: number) {
    this.page = i;
    this.getEmployees();

  }

  errorPage() {
    this.toastr.error("không tìm thấy trang", "thông báo");
  }

  previous() {
    if (this.page === 0) {
      this.errorPage();
    } else {
      this.page = this.page - 1;
      this.getEmployees();
    }
  }


  next() {
    if (this.page > this.pages.length - 2) {
      this.errorPage();
    } else {
      this.page = this.page + 1;
      this.getEmployees();
    }
  }

  search() {
    switch (this.select){
      case 'code':
        this.employeeCode=  this.searchValue;
        this.position = "";
        this.page=0;
        this.getEmployees();
        break;
      case 'name':
        this.employeeCode = "";
        this.employeeName =this.searchValue;
        this.page=0;
        this.getEmployees();
        break;
      case 'address':
        this.employeeCode = "";
        this.employeeName = "";
        this.employeeAddress = this.searchValue;
        this.page=0;
        this.getEmployees()
        break;
      case 'position':
        this.employeeCode = "";
        this.employeeName = "";
        this.employeeAddress = "";
        this.position = this.searchValue;
        this.page=0;
        this.getEmployees();
        break;
      case 'employeePhone':
        this.employeeCode = "";
        this.employeeName = "";
        this.employeeAddress = "";
        this.position = "";
        this.employeePhone=this.searchValue
        this.page=0;
        this.getEmployees();

    }
  }

  showSuccessDelete() {
    this.toastr.success('Đã xóa thành công !', 'Thông báo : ');
  }

  showErrorDelete() {
    this.toastr.error('Vui lòng chọn nhân viên bạn muốn xóa !', 'Cảnh báo : ');
  }

  getEmpl(e: Employee) {
    this.employee = e;
    this.change = e.employeeId;

  }

  onDeleteHandler(): void {
    console.log(this.employee);
    if (this.employeeColor == null) {
      this.showErrorDelete();
    } else {
      const dialogRef = this.dialog.open(EmployeeDeleteComponent, {
        data: this.employee
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result) {
          this.employeeService.deleteEmployeeByRequest(this.employee.employeeId).subscribe(next => {
            this.showSuccessDelete();
            this.getEmployees();
          });
        }
      });

    }

  }


  sortByRequest() {
    this.search();
    this.getEmployees();

  }

  getEmployeeId(employeeId) {
    this.err = !this.err;
    if (this.err === false) {
      this.employeeColor = employeeId;

    } else {
      this.employeeColor = null;

    }
  }

  openDialogUpdate() {
    if (this.employeeColor == null) {
      this.showError()
    } else {
      let dialogRef = this.dialog.open(DialogComponent, {
          data: this.employee,
          width: "650px"
        }
      );
    }
  }

  showError() {
    this.toastr.error('Vui lòng chọn dòng muốn sửa!', 'Cảnh báo : ');
  }
}
