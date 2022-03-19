import {Component, OnInit} from '@angular/core';
import {Drug} from '../../../../model/drug';
import {FormControl, FormGroup} from '@angular/forms';
import {Indicative} from '../../../../model/indicative';
import {IndicativeService} from '../../../../service/indicative.service';
import {DrugService} from '../../../../service/drug.service';

@Component({
  selector: 'app-indicative-list',
  templateUrl: './indicative-list.component.html',
  styleUrls: ['./indicative-list.component.css']
})
export class IndicativeListComponent implements OnInit {
  indicatives!: Indicative[];
  name = 'test';
  values = [];


  constructor(private indicativeService: IndicativeService) {
  }

  removeValue(i) {
    this.values.splice(i, 1);
  }

  addValue() {
    this.values.push({value: ''});
  }

  ngOnInit(): void {
    this.getIndicatives();
  }

  getIndicatives() {
    this.indicativeService.getAllIndicative().subscribe(indicatives => {
      this.indicatives = indicatives;
    });
  }

}
