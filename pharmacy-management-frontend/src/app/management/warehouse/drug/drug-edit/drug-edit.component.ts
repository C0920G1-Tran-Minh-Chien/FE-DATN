import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DrugService} from '../../../../service/drug.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DrugDeleteComponent} from '../drug-delete/drug-delete.component';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {DrugGroup} from '../../../../model/drugGroup';
import {Drug} from '../../../../model/drug';
import {DrugGroupDto} from '../../../../model/drug-group';

import {DrugNotificationComponent} from '../drug-notification/drug-notification.component';
import {DrugGroupService} from "../../../../service/drug-group.service";
import {ToastrService} from "ngx-toastr";
declare var $: any;
@Component({
  selector: 'app-drug-edit',
  templateUrl: './drug-edit.component.html',
  styleUrls: ['./drug-edit.component.css']
})
export class DrugEditComponent implements OnInit {
  drugGroups: DrugGroupDto[] = [];
  drugForm: FormGroup;
  drugId;
  drugCode;
  drugGroup;
  selectedImage;
  urlImage;
  edited;

  constructor(private drugService: DrugService,
              private dialog: MatDialog,
              private drugGroupService: DrugGroupService,
              private dialogRef: MatDialogRef<DrugEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private storage: AngularFireStorage,
              private toastr : ToastrService) {
    this.drugId = this.data.data1.drugId;
    this.drugCode = this.data.data1.drugCode;
    this.drugGroup = this.data.data1.drugGroup;
    this.getDrug();
  }

  ngOnInit(): void {
    $(() => {
      $('.select2').select2();
    });
    this.getAllDrugGroup();
  }
  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.drugGroupId === c2.drugGroupId : c1 === c2;
  }
  private getDrug() {
    return this.drugService.getDrugById(this.drugId).subscribe(drug => {
      this.drugForm = new FormGroup({
        drugName: new FormControl(drug.drugName, [Validators.required, Validators.maxLength(25)]),
        drugFaculty: new FormControl(drug.drugFaculty, [Validators.required, Validators.maxLength(50)]),
        activeElement: new FormControl(drug.activeElement, [Validators.required, Validators.maxLength(50)]),
        drugSideEffect: new FormControl(drug.drugSideEffect, [Validators.required, Validators.maxLength(50)]),
        conversionRate: new FormControl(drug.conversionRate, [Validators.required, Validators.min(1), Validators.pattern(/^\d*$/)]),
        // drugImageDetails: new FormControl(drug.drugImageDetails),
        // tslint:disable-next-line:max-line-length
        wholesaleProfitRate: new FormControl(drug.wholesaleProfitRate, [Validators.required, Validators.min(0), Validators.pattern(/^\d*\.?\d*$/)]),
        retailProfitRate: new FormControl(drug.retailProfitRate, [Validators.min(0), Validators.pattern(/^\d*\.?\d*$/)]),
        unit: new FormControl(drug.unit, [Validators.required]),
        conversionUnit: new FormControl(drug.conversionUnit, [Validators.required]),
        manufacturer: new FormControl(drug.manufacturer, [Validators.maxLength(25)]),
        origin: new FormControl(drug.origin,[Validators.required]),
        drugGroup: new FormControl(drug.drugGroup, [Validators.required]),
        note: new FormControl(drug.note, [Validators.maxLength(250)])
      });
      this.drugService.getDrugGroupById(+drug.drugGroupId).subscribe(drugGroup => {
        this.drugForm.get('drugGroup').setValue(drugGroup);
      })
    });
  }
  updateDrug() {
    this.drugService.update(this.drugId, this.drugCode,this.drugForm.value).subscribe(data => {
      this.toastr.success("Sửa thành công!")
      this.dialogRef.close();
      this.edited = true;
      this.edited = false;
      for (let i = 0; i < this.urlImage.length; i++) {
        let drugImage = {
          drugImageDetailUrl: this.urlImage[i],
          drug: data,
        };
        this.drugService.saveImage(drugImage).subscribe(() => {
        });
      }
      });
  }
  uploadFile(imageFile) {
    this.urlImage = [];
    const nameImg = this.getCurrentDateTime() + imageFile.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, imageFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.urlImage.push(url);
        });
      })
    ).subscribe();
  }
  showPreview(event: any) {
    this.selectedImage = [];
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImage.push(e.target.result);
        };
        reader.readAsDataURL(file);
        this.uploadFile(file);
      }
    }
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getAllDrugGroup() {
    this.drugGroupService.getAll().subscribe(drugGroups => {
      this.drugGroups = drugGroups;
    });
  }
  notificationDialog(): void {
    const dialogRef = this.dialog.open(DrugNotificationComponent, {
      width: '500px',
      data: {data1: false, data2: false, data3: false, data4: false, data5: this.edited}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
