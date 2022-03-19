import {Component, OnInit} from '@angular/core';
import {PrescriptionService} from '../../../../service/prescription.service';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IndicativeService} from '../../../../service/indicative.service';
import {ToastrService} from 'ngx-toastr';
import {Prescription} from '../../../../model/prescription';
import {DrugService} from "../../../../service/drug.service";




@Component({
  selector: 'app-prescription-create',
  templateUrl: './prescription-create.component.html',
  styleUrls: ['./prescription-create.component.css']
})
export class PrescriptionCreateComponent implements OnInit {
  drugs;
  drinkDay: number;
  drinkTime: number;
  totalPill = this.drinkDay * this.drinkTime;
  pres: Prescription[];
  code = 'TT001';
  lastId: number;

  constructor(private prescriptionService: PrescriptionService,
              private fb: FormBuilder,
              private indicativeService: IndicativeService,
              private router: Router,
              private toastr: ToastrService,
              private drugService: DrugService) {
  }

  prescriptionForm: FormGroup;

  ngOnInit(): void {
    this.prescriptionService.getPress().subscribe(pres => {
      this.pres = pres;
      this.lastId = this.pres[this.pres.length - 1].prescriptionId;
      if (this.lastId < 10) {
        this.code = 'TT00' + (this.lastId + 1);
      } else if (this.lastId < 100) {
        this.code = 'TT0' + (this.lastId + 1);
      } else {
        this.code = 'TT' + (this.lastId + 1);
      }
    });
    this.getAllDrug();
    this.prescriptionForm = this.fb.group({
      prescriptionCode: new FormControl('', [Validators.required]),
      prescriptionName: new FormControl('', [Validators.required]),
      symptom: new FormControl('', [Validators.required]),
      object: new FormControl('', [Validators.required]),
      numberOfDay: new FormControl('', [Validators.required]),
      note: new FormControl(''),
      indicatives: this.fb.array([this.fb.group({
        drug: new FormControl(''),
        totalPill: new FormControl(this.totalPill),
        drinkDay: new FormControl(''),
        drinkTime: new FormControl(''),
      })])
    });
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

  getAllDrug() {
    this.drugService.getAllNormal().subscribe(value => {
      this.drugs = value;
    });
  }

  submit() {
    const prescription = this.prescriptionForm.value;
    console.log(prescription);
    this.prescriptionService.savePrescription(prescription).subscribe(() => {
        this.prescriptionForm.reset();
        this.router.navigateByUrl('/prescription/prescription-list');
        this.showSuccess();
      }, error => {
        this.showError();
      }
    );
  }

  showSuccess() {
    this.toastr.success('Thêm mới thành công !', 'Thông báo : ');
  }

  showError() {
    this.toastr.error('Thêm mới không thành công !' +
      'Vui lòng nhập đầy đủ các trường ', 'Cảnh báo : ');
  }
}

