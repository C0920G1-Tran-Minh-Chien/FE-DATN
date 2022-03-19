import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DrugService} from '../../../service/drug.service';
import {PrescriptionService} from '../../../service/prescription.service';
import {Drug} from '../../../model/drug';
import {Prescription} from '../../../model/prescription';
import {DeleteComponent} from '../delete/delete.component';
import {Indicative} from '../../../model/indicative';
import {DrugOfBill} from "../../../model/drug-of-bill";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {FontBase64} from "../../../font-base64";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-prescription-detail',
  templateUrl: './prescription-detail.component.html',
  styleUrls: ['./prescription-detail.component.css']
})
export class PrescriptionDetailComponent implements OnInit {
  drugs: Drug[] = [];
  indicatives: Indicative[];
  id: number;
  prescription: Prescription;
  fromPrescription: FormGroup;
  drugOfBills: DrugOfBill[] = [];

  constructor(public dialog: MatDialog,
              private drugService: DrugService,
              private activatedRoute: ActivatedRoute,
              private prescriptionService: PrescriptionService,
              private router: Router,
              private fontBase : FontBase64,private toastr : ToastrService,
  ) {
    this.fromPrescription = new FormGroup({});
    activatedRoute.paramMap.subscribe((param) => {
      // tslint:disable-next-line:radix
      this.id = parseInt(param.get('id'));
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.getDrugOfBills();
    this.getPrescription();
  }

  openDeleteDialog(drugOfBill) {
    const dialog = this.dialog.open(DeleteComponent, {
      height: '300px', width: '500px',
      data: [this.indicatives,drugOfBill]
    });
    this.dialog.afterAllClosed.subscribe(()=>{
      this.toastr.success("Đã xóa thành công!")
    })
  }

  getAll() {
    this.drugService.getAllDrugPrice().subscribe(next => {
      this.drugs = next;
      console.log(this.drugs);
    });

  }

  getDrugOfBills() {
    this.prescriptionService.findAll(this.id).subscribe(next => {
      this.indicatives = next;
      // for (let i = 0; i < this.indicatives.length; i++) {
      //   for (let j = 0;j < this.drugs.length ; j++){
      //     if(this.indicatives[i].drug.drugId == this.drugs[j].drugId){
      //       this.indicatives[i].drug = this.drugs[j];
      //     }
      //   }
      // };
      console.log(this.indicatives);
    });

  }

  getPrescription() {
    this.prescriptionService.findPrescriptionById(this.id).subscribe(next => {
      this.prescription = next;
    });
  }

  addToBill(indicatives) {
    for (let i = 0; i < this.indicatives.length; i++) {
      for (let j = 0;j < this.drugs.length ; j++){
        if(this.indicatives[i].drug.drugId == this.drugs[j].drugId){
          this.indicatives[i].drug = this.drugs[j];
        }
      }
    };
    for (let i = 0; i < indicatives.length; i++) {
      this.drugOfBills[i] = {drug: indicatives[i].drug, quantity: indicatives[i].totalPill}
    }
    console.log(this.drugOfBills)
    const navigationExtras: NavigationExtras = {state: {data: this.drugOfBills}};
    this.router.navigate(['/sale'], navigationExtras);
  }

  sendData() {
  }

  formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 5
  });

  htmlToPDF() {
      const doc = new jsPDF('l', 'mm', 'a4');
      doc.addFileToVFS('src/assets/font/Calibri Light.ttf', this.fontBase.font);
      doc.addFont('src/assets/font/Calibri Light.ttf', 'Calibri Light', 'normal');
      doc.setFont('Calibri Light');
      doc.setFontSize(25);
      doc.setTextColor('red');
      doc.text('Thông tin toa thuốc', 110, 10);
      doc.text('Công ty KHOACHIEN Pharmacy', 90, 20);
      doc.setFontSize(25);
      doc.setTextColor('black');
      doc.text('Đơn thuốc', 120, 40);
      doc.setFontSize(14);
      doc.text('Tên đơn thuốc : ' + this.prescription.prescriptionName, 50, 50);
      doc.text('Triệu chứng : ' + this.prescription.symptom, 180, 50);
      doc.text('Đối tường: ' + this.prescription.object, 50, 60);
      doc.text('Số ngày uống : ' + this.prescription.numberOfDay, 180, 60);
    const head = [['STT', 'Tên thuốc', 'Số lượng']];
    const body = [];
    let number1 = 1;
    this.indicatives.forEach((d,i) => {

      let temp = [i +1, d.drug.drugName, d.totalPill + " viên"];
      body.push(temp);
    });
    autoTable(doc, {
      styles: {
        font: 'Calibri Light',
        fontSize: 14
      },
      margin: {top: 70},
      head: head,
      body: body,
      didDrawCell: (data) => {
      },
    },);
      doc.text('Đà Nẵng , Ngày.........Tháng..........Năm..........', 160,  this.indicatives.length * 8.5 + 95);
      doc.text('Người lập phiếu', 190, this.indicatives.length * 7.5 + 105);
      doc.save('Hóa đơn bán hàng ' + '.pdf');

  }



}
