import {Importbilldrug} from './importbilldrug';
import {ExportBill} from './exportBill';

export interface ExportBillDetails {
  exportBillDetailId?: number;
  importBillDrug?: Importbilldrug;
  exportBill?: ExportBill;
}
