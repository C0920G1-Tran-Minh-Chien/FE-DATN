import {Drug} from './drug';
import {BillSale} from './bill-sale';
export interface DrugOfBill {
  drugOfBillId?: number;
  quantity?: number;
  drug?: Drug;
  prescription?;
  billSale?: BillSale;
}
