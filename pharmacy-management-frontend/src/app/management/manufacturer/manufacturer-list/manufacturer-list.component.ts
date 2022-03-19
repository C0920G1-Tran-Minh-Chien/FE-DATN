import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ManufacturerUpdateComponent} from "../manufacturer-update/manufacturer-update.component";
import {ManufacturerDeleteComponent} from "../manufacturer-delete/manufacturer-delete.component";
import {ManufacturerService} from "../../../service/manufacturer.service";
import { Manufacturer } from 'src/app/model/manufacturer';
import {ToastrService} from "ngx-toastr";
import {ManufacturerCreateComponent} from "../manufacturer-create/manufacturer-create.component";
import {WarehouseImportPaymentComponent} from '../../warehouse/warehouse-import/warehouse-import-payment/warehouse-import-payment.component';



@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.css']
})
export class ManufacturerListComponent implements OnInit {
  manufacturers: Array<any>;
  page: number = 0;
  pages: Array<number>;
  name: string = "";
  address: string = "";
  search: any;
  selects: any;
  sort: any;
  max: number;
  idDialog: any;
  nameDialog: any;
  background: string;




  constructor(private dialog: MatDialog, private manufacturerService: ManufacturerService,private  toastr:ToastrService) {

  }

  ngOnInit(): void {
    this.getAll()

  }

  getAll() {
    this.manufacturerService.getAll(this.page, this.search, this.selects, this.sort).subscribe(manufacturer => {
      this.manufacturers = manufacturer['content'];
      this.pages = new Array(manufacturer['totalPages']);

    });
  }

  openDialogUpdate(): void {
    const id = this.idDialog;
    const name = this.nameDialog;
    let dialogRef = this.dialog.open(ManufacturerUpdateComponent, {
        data: {id, name},
        width:'750px'
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.getAll()
    });
  }

  openDialogDelete(): void {
    const id = this.idDialog;
    const name = this.nameDialog;
    let dialogRef = this.dialog.open(ManufacturerDeleteComponent, {
        data: {id, name}
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.getAll()
    });
  }

  previous() {
    if (this.page <= 0) {
      this.toastr.error("Không tìm thấy trang.", 'Trang trước')
    } else {
      this.page = this.page - 1;
      this.getAll();
    }
  }

  next() {
    this.max = this.pages.length;
    if (this.page + 2 > this.max) {
      this.toastr.error("Không tìm thấy trang.", 'Trang sau')
    } else {
      this.page = this.page + 1;
      this.getAll();
    }
  }


  setPage(i: number): void {
    this.page = i;
    this.getAll();
  }

  searchManufacturer() {
    this.getAll();
  }

  sortManufacturer() {
    this.getAll();
  }
selectedMovie: Manufacturer;
  getId(manufacturerId: any, manufacturerName: any,movie:Manufacturer): void {
    this.idDialog = manufacturerId;
    this.nameDialog = manufacturerName;
   this.selectedMovie=movie;
  }

  dialogCreate() {
    let dialogRef = this.dialog.open(ManufacturerCreateComponent, {
      width:'750px'
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.getAll()
    });
  }

  dialogPayment() {
    let dialogRef = this.dialog.open(WarehouseImportPaymentComponent, {
      }
    );
    dialogRef.afterClosed().subscribe(() => {
      this.getAll()
    });
  }
}
