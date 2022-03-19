import {Component, Inject, OnInit} from '@angular/core';
import {AccountService} from "../../../../service/account/account.service";
import {newArray} from "@angular/compiler/src/util";
import {DialogComponent} from "../dialog/dialog.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AccountEditComponent} from "../account-edit/account-edit.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  page = 0;
  size = 5;
  keyWord = '';
  property = 0;
  pagination = {
    totalPages: 0
  };
  idAccount: number;
  idAccountReClick: boolean;
  roleId = 0;
    constructor(
      private accountService: AccountService,
      public dialog: MatDialog,
      private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.findAllAccount(this.page, this.size, this.keyWord, this.property, this.roleId);
      }

  findAllAccount(page: number, size: number, keyword: string, property: number, roleId: number) {
      this.page = page;
      this.accountService.getAllAccount(page, size, keyword, property, roleId).subscribe(next => {
      this.accounts = next.content;
      console.log(this.accounts);
      this.pagination.totalPages = next.totalPages;
      if (this.accounts.length==0){
        this._snackBar.open("Không có kết quả tìm kiếm!!!" , null,{
          duration: 4000,
          horizontalPosition: "right",
          verticalPosition: "top",
          panelClass: ['snack-bar-find']
        });
      }
    });
  }

  onchangeProperty(e) {
    if (e == 0) {
      this.keyWord = '';
    }
  }

  get pages() {
    return new Array(this.pagination.totalPages);
  }

  changePage(i: number) {
    this.page = i;
    this.findAllAccount(this.page, this.size, this.keyWord, this.property, this.roleId);
  }

  backPage() {
    if (this.page == 0) { return; }
    this.page--;
    if (this.page >= 0) {
      this.findAllAccount(this.page, this.size, this.keyWord, this.property, this.roleId);
    }
  }

  nextPage() {
    if (this.page == this.pagination.totalPages - 1) { return; }
    this.page++;
    if (this.page <= this.pagination.totalPages) {
      this.findAllAccount(this.page, this.size, this.keyWord, this.property, this.roleId);
    }
  }

  searchAccount() {
    this.page = 0;
    this.findAllAccount(this.page, this.size, this.keyWord, this.property, this.roleId);
  }

  getIdAccount(id: number) {
    if (id == this.idAccount){
      this.idAccountReClick = false;
      this.idAccount = 0;
    } else {
      this.idAccountReClick = true;
      this.idAccount = id;
    }
  }

  onUpdateHendler(idAccount: number) {
    let dialogRef = this.dialog.open(AccountEditComponent, {
      width: '700px',
      data: idAccount
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result){
        this.findAllAccount(this.page, this.size, this.keyWord, this.property,  this.roleId);
      }
    });
  }
}
