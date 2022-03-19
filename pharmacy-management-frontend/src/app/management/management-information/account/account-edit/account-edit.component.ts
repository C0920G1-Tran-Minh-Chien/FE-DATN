import {Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AccountService} from "../../../../service/account/account.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Role} from "../../../../model/account/role";
import {RoleService} from "../../../../service/account/role.service";
import {Account} from "../../../../model/account/account";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";



@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  accountForm: FormGroup = new FormGroup({
    userCode: new FormControl('', [Validators.required]),
    accountName: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern("^[0-9a-zA-Z]*$")]),
    password: new FormControl(''),
    role: new FormControl('', [Validators.required]),
  });
  roles: Role[];
  account: any;
  id: number;
  messageErrors: string[];
  @Input()
  messageSussess: string;

  constructor(
    public dialogRef: MatDialogRef<AccountEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private roleService: RoleService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getAccount(this.data);
    this.getRole();
  }

  getAccount(id: number) {
    return this.accountService.findById(id).subscribe(account => {
      this.account = account;
      console.log(this.account);
      this.accountForm.patchValue(this.account);
      this.accountForm.get('role').setValue(this.account.roles[0]);
      console.log(this.accountForm.value);
    });
  }

  getRole() {
    return this.roleService.getAllRole().subscribe(roles => {
      this.roles = roles;
    });
  }

  submit() {
    if (this.accountForm.invalid) return;
    let accountDto: Account;
    accountDto = {
      id: this.data,
      userName: this.accountForm.value.userName,
      userCode: this.accountForm.value.userCode,
      accountName: this.accountForm.value.accountName,
      password: this.accountForm.value.password,
      roles: [this.accountForm.value.role]
    };
    console.log(accountDto);
    this.accountService.updateAccount(this.data, accountDto).subscribe(next => {
      if (next.status) {
        this.messageSussess = next.msg;
        this.dialogRef.close(true);
        this._snackBar.open(this.messageSussess , null,{
          duration: 4000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['snack-bar']
        });
      } else {
        this.messageErrors = next.errors;
      }
    });
  }

  compareFn(c1: Role, c2: Role): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }


  confirmUpdateHandler() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submit()
      }
    });
  }

  confirmResetHandler() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let accountDto: Account;
        accountDto = {
          id: this.data,
          userName: this.accountForm.value.userName,
          userCode: this.accountForm.value.userCode,
          accountName: this.accountForm.value.accountName,
          password: '123456',
          roles: [this.accountForm.value.role]
        };
        this.accountService.updateAccount(this.data, accountDto).subscribe(next => {
          this._snackBar.open("Reset mật khẩu thành công!!!" , null,{
            duration: 4000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: ['snack-bar']
          });
        });
        this.router.navigateByUrl("management/management-information/account/list")
      }
    });
  }
}
