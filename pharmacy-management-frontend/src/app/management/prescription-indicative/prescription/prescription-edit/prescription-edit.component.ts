import {Component, Inject, OnInit} from '@angular/core';
import {PrescriptionService} from '../../../../service/prescription.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IndicativeService} from '../../../../service/indicative.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Prescription} from '../../../../model/prescription';
import {Indicative} from '../../../../model/indicative';
import {ToastrService} from 'ngx-toastr';
import {DrugService} from "../../../../service/drug.service";

@Component({
  selector: 'app-prescription-edit',
  templateUrl: './prescription-edit.component.html',
  styleUrls: ['./prescription-edit.component.css']
})
export class PrescriptionEditComponent implements OnInit {
  drugs;
  prescription: Prescription;
  indicativeList: Indicative[] = [];
  drinkDay: number;
  drinkTime: number;
  totalPill = this.drinkDay * this.drinkTime;

  constructor(private prescriptionService: PrescriptionService,
              private fb: FormBuilder,
              private indicativeService: IndicativeService,
              private router: Router,
              public dialogRef: MatDialogRef<PrescriptionEditComponent>,
              private  toastr: ToastrService,
              private drugService: DrugService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.getIndicative();
    this.ngOnInit();

  }

  prescriptionForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.prescriptionService.findById(this.data.id).subscribe(prescriptions => {
      this.prescription = prescriptions;
      this.prescriptionForm.patchValue(this.prescription);
    });
    this.getAllDrug();
    this.prescriptionForm = new FormGroup({
      prescriptionCode: new FormControl('', [Validators.required]),
      prescriptionName: new FormControl('', [Validators.required]),
      symptom: new FormControl('', [Validators.required]),
      object: new FormControl('', [Validators.required]),
      numberOfDay: new FormControl('', [Validators.required]),
      note: new FormControl('', [Validators.required]),
      indicatives: this.fb.array([this.fb.group({
        indicativeId: new FormControl(''),
        drug: new FormControl(''),
        totalPill: new FormControl(this.totalPill),
        drinkDay: new FormControl(''),
        drinkTime: new FormControl('')
      })])
    });
  }
  getAllDrug() {
    this.drugService.getAllNormal().subscribe(value => {
      this.drugs = value;
    });
  }
  getIndicative() {
    this.prescriptionService.getIdicative(this.data.id).subscribe(ind => {
      this.indicativeList = ind;

      if (!ind){
        ind = [];
      }
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < ind.length; i++) {
        // @ts-ignore
        this.indicatives.push(ind[i]);
      }
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  get indicatives() {
    return this.prescriptionForm.get('indicatives') as FormArray;
  }

  addIndicative() {
    this.indicatives.push(this.fb.group({
      drug: '',
      totalPill: '',
      drinkDay: '',
      drinkTime: ''
    }));
  }


  deleteIndicative(index) {
    this.indicatives.removeAt(index);
  }

  submit() {
    const prescription = this.prescriptionForm.value;
    this.prescriptionService.updatePrescription(this.data.id, prescription).subscribe(() => {
      this.showSuccessEdit();
      }, e => {
      this.showError();
      }
    );
  }


  showSuccessEdit() {
    this.toastr.success('Đã cập nhật thành công !', 'Thông báo : ');
  }

  showErrorEdit() {
    this.toastr.error('Vui lòng chọn hàng bạn muốn cập nhật !', 'Cảnh báo : ');
  }

  showError() {
    this.toastr.error('Cập nhật không thành công !', 'Cảnh báo : ');
  }
}
