import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {ManufacturerService} from "../../../service/manufacturer.service";
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ImportBillShowComponent} from '../import-bill-show/import-bill-show.component';
import { Manufacturer } from 'src/app/model/manufacturer';
import {ImportBill} from "../../../model/import-bill";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-manufacturer-show',
  templateUrl: './manufacturer-show.component.html',
  styleUrls: ['./manufacturer-show.component.css']
})
export class ManufacturerShowComponent implements OnInit {
  id: any;
  manufacturer: Manufacturer;
  page:any=0;
  pages:Array<number>;
  max:any;
  startDate: string="1000-01-01T11:11";
  endDate: string="9999-11-11T11:11";
 importBills: ImportBill[];
 idDialog: number;
 sd:string="1111-12-30";
 ed:string="9999-11-11";
 st:string="11:11:11";
 et:string="11:11:11";


  constructor(private dialog: MatDialog, private manufacturerService: ManufacturerService, private activatedRoute: ActivatedRoute,private  toastr:ToastrService) {
    activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      manufacturerService.findByIdManufacture(this.id).subscribe(data => {
        this.manufacturer = data;
      });

      this.getAllImportBill();


    });

  }

  ngOnInit(): void {

  }
  getAllImportBill(){
     this.manufacturerService.findImportBillByIdManufacturer(this.id,this.startDate,this.endDate,this.page).subscribe(data =>{
      this.importBills=data['content'];

      this.pages=new Array<number>(data['totalPages']);
    });
  }



  dialogShow(): void {
  const  id=this.idDialog;
    let dialogRef = this.dialog.open(ImportBillShowComponent, {
      data: {id}
    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }
  previous() {

    if (this.page <= 0) {
      this.toastr.error("Không tìm thấy trang.", 'Trang trước')
    } else {
      this.page = this.page - 1;
      this.getAllImportBill();
    }
  }

  next() {

    this.max = this.pages.length;
    if (this.page + 2 > this.max) {
      this.toastr.error("Không tìm thấy trang.", 'Trang sau')
    } else {
      this.page = this.page + 1;
      this.getAllImportBill();
    }
  }


  setPage(i: number) {
    this.page = i;
    this.getAllImportBill();
  }
  selectedMovie: ImportBill;
  getId(importBillId: any , movie:ImportBill): void {
    this.idDialog = importBillId;
    this.selectedMovie=movie;
  }

  searchDate() {
    this.startDate=this.sd+'T'+this.st;
    console.log(this.startDate);
    this.endDate=this.ed+'T'+this.et;
    console.log(this.endDate)
    this.getAllImportBill()
  }
}
