import {Drug} from './drug';
import {PrescriptionIndicative} from './prescription-indicative';
import {Prescription} from './prescription';

export interface Indicative {
  indicativeId?: number;
  totalPill?: number;
  drinkDay?: number;
  drinkTime?: number;
  drug?;
  prescription?: Prescription;
}
