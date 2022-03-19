import {Component, OnInit} from '@angular/core';
import {Prescription} from '../../../../model/prescription';
import {PrescriptionService} from '../../../../service/prescription.service';
import {MatDialog} from '@angular/material/dialog';
import {PrescriptionDeleteComponent} from '../prescription-delete/prescription-delete.component';
import {PrescriptionEditComponent} from '../prescription-edit/prescription-edit.component';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {
  idEdit: number;
  prescriptions: Prescription[] = [];
  pages: Array<any> = [];
  prescription: Prescription;
  prescriptionName = '';
  prescriptionCode = '';
  object = '';
  page = 0;
  symptom = '';
  sortBy = 'prescription_id';
  select: any;
  valueSearch: any;
  err = true;


  constructor(private prescriptionService: PrescriptionService,
              public dialog: MatDialog,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getPrescriptions();
  }

  getPrescriptions() {
    // tslint:disable-next-line:max-line-length
    this.prescriptionService.getAllPrescription(this.prescriptionName, this.prescriptionCode, this.object, this.symptom, this.page, this.sortBy).subscribe(prescriptions => {
      if (prescriptions === null) {
        this.prescriptions = [];
      }
      this.prescriptions = prescriptions.content;
      this.pages = new Array<any>(prescriptions.totalPages);
    });
  }

  setPage(i: number) {
    this.page = i;
    this.getPrescriptions();

  }

  previous() {
    if (this.page === 0) {
      this.showErrorPage();
    } else {
      this.page = this.page - 1;
      this.getPrescriptions();
    }
  }

  next() {
    if (this.page > this.pages.length - 2) {
      this.showErrorPage();
    } else {
      this.page = this.page + 1;
      this.getPrescriptions();
    }
  }

  getPres(p: Prescription) {
    this.prescription = p;
  }

  onDeleteHandler(prescription: Prescription): void {
    if (this.idEdit == null) {
      this.showErrorDelete();
    } else {
      const dialogRef = this.dialog.open(PrescriptionDeleteComponent, {
        width: '500px',height:'300px',
        data: prescription
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result) {
          this.prescriptionService.deletePrescription(prescription.prescriptionId).subscribe(next => {
            this.getPrescriptions();
            this.showSuccessDelete();
            this.idEdit = null;
          });
        }
      });
    }
  }

  onEditHandler() {
    if (this.idEdit == null) {
      this.showErrorEdit();
    } else {
      const id = this.idEdit;
      const dialogRef = this.dialog.open(PrescriptionEditComponent, {
        data: {id}
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPrescriptions();
        // this.showSuccessEdit();
      });
    }
  }

  getId(prescriptionId: number) {
    this.err = !this.err;
    if (this.err === false) {
      this.idEdit = prescriptionId;

    } else {
      this.idEdit = null;
    }
  }

  search() {
    switch (this.select) {
      case 'tenThuoc':
        this.prescriptionName = this.valueSearch;
        this.getPrescriptions();
        console.log(this.prescriptionName);
        console.log(this.valueSearch);
        break;
      case 'maToaThuoc':
        this.prescriptionName = '';
        this.prescriptionCode = this.valueSearch;
        this.getPrescriptions();
        break;
      case 'doiTuong':
        this.prescriptionCode = '';
        this.prescriptionName = '';
        this.object = this.valueSearch;
        this.getPrescriptions();
        break;
      case 'trieuChung':
        this.prescriptionCode = '';
        this.prescriptionName = '';
        this.object = '';
        this.symptom = this.valueSearch;
        this.getPrescriptions();
        console.log(this.getPrescriptions());
        break;

    }
  }

  sort() {
    this.getPrescriptions();
  }

  showSuccessEdit() {
    this.toastr.success('Đã cập nhật thành công !', 'Thông báo : ');
  }

  showErrorEdit() {
    this.toastr.error('Vui lòng chọn hàng bạn muốn cập nhật !', 'Cảnh báo : ');
  }

  showSuccessDelete() {
    this.toastr.success('Đã xóa thành công !', 'Thông báo : ');
  }

  showErrorDelete() {
    this.toastr.error('Vui lòng chọn vào hàng bạn muốn xóa !', 'Cảnh báo : ');
  }

  showErrorPage() {
    this.toastr.error('Không tìm thấy trang !', 'Cảnh báo : ');
  }

}
