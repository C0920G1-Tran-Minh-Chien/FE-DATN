import {PrescriptionIndicative} from './prescription-indicative';
import {Indicative} from './indicative';

export interface Prescription {
  prescriptionId?: number;
  prescriptionCode?: string;
  prescriptionName?: string;
  symptom?: string;
  object?: string;
  flag?: boolean;
  numberOfDay?: number;
  note?: string;
  indicatives: Indicative[];
}
