import {ImportBill} from './import-bill';
import {Drug} from './drug';

export interface ImportBillDrug {
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
