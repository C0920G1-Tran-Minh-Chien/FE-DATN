import { Component, OnInit } from '@angular/core';
import {Prescription} from "../../../model/prescription";
import {HttpClient} from "@angular/common/http";
import {PrescriptionService} from "../../../service/prescription.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pres',
  templateUrl: './pres.component.html',
  styleUrls: ['./pres.component.css']
})
export class PresComponent implements OnInit {

  id: number;
  prescriptions: Prescription[] = [];
  pres: Prescription;
  fieldSearch = '';
  valueSearch = '';
  constructor(private http: HttpClient,
              private prescriptionService: PrescriptionService,
              private dialog: MatDialog,
              public router: Router,
              private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.prescriptionService.getAll().subscribe(next => {
      this.prescriptions = next;
    });
  }


  showView(id: number) {
    this.id = id;
  }

  showDetail() {
    this.router.navigate(['/prescription-detail', this.id]);
  }


  showChoose(p: Prescription) {
    this.pres = p;
  }

  search() {
    this.prescriptionService.search(this.fieldSearch, this.valueSearch).subscribe( next => {
      this.prescriptions = next;
    });
  }

}
