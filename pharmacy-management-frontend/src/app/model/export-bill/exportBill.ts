import {Exportbilltype} from './exportbilltype';
import {Employee} from './employee';
import {Manufacturer} from './manufacturer';

export interface ExportBill {
  exportBillId?:number;
  exportBillCode?: string;
  exportBillDate?: string;
  exportBillReason ?: string;
  exportBillAddress?: string;
  exportBillType?: Exportbilltype;
  employee?: Employee;
  manufacturer?: Manufacturer;
}
