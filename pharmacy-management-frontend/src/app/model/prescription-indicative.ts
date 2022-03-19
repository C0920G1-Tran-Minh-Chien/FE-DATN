import {Prescription} from './prescription';
import {Indicative} from './indicative';

export interface PrescriptionIndicative {
  prescriptionIndicativeId?: number;
  prescription?: Prescription;
  indicative?: Indicative;
}
