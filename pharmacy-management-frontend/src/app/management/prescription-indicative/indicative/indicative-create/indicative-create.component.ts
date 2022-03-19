import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Indicative} from '../../../../model/indicative';
import {Router} from '@angular/router';
import {Drug} from '../../../../model/drug';
import {IndicativeService} from '../../../../service/indicative.service';
import {DrugService} from '../../../../service/drug.service';
import {log} from 'util';

@Component({
  selector: 'app-indicative-create',
  templateUrl: './indicative-create.component.html',
  styleUrls: ['./indicative-create.component.css']
})
export class IndicativeCreateComponent implements OnInit {
  indicatives!: Indicative[];

  values = [];
  indicativeForm: FormGroup = new FormGroup({
    indicativeId: new FormControl(),
    totalPill: new FormControl(),
    drinkDay: new FormControl(),
    drinkTime: new FormControl(),
    amountPill: new FormControl(),
  });
  // drugs!: Drug[];
  drugs = ['Aspirin', 'Panadol', 'Ampicilin'];

  constructor(private indicativeService: IndicativeService,
              private  drugService: DrugService,
              private  router: Router) {
  }

  ngOnInit(): void {
    // this.getDrugs();
  }

  // getDrugs() {
  //   this.drugService.getAll().subscribe(drugs => {
  //     this.drugs = drugs;
  //     this.router.navigateByUrl('indicative/indicative-list');
  //   });
  // }

  submit() {
    const indicative = this.indicativeForm.value;
    this.indicativeService.getAllIndicative().subscribe(() => {
      this.indicativeForm.reset();
    });
  }

  removeValue(i) {
    this.values.splice(i, 1);
  }

  addValue() {
    this.values.push({value: ''});
    console.log(this.values);
  }
}
