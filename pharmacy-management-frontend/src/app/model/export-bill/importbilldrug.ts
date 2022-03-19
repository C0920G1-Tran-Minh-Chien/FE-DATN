import {Drug} from './drug';
import {ImportBill} from './importBill';

export interface Importbilldrug {
  importBillDrugId?;
  importAmount?;
  importPrice?;
  discountRate?;
  lotNumber?;
  expiry?;
  vat?;
  importBill?: ImportBill;
  drug?: Drug;
}
