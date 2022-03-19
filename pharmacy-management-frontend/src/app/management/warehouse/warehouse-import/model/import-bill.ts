import {Employee} from './employee';
import {Manufacturer} from './manufacturer';
import {Payment} from './payment';

export interface ImportBill {
  importBillId?: number;
  importSystemCode?: string;
  accountingVoucher?: string;
  invoiceDate?: string;
  date?: string;
  time?: string;
  flag?: string;
  employee?: Employee;
  manufacturer?: Manufacturer;
  payment?: Payment;
}
