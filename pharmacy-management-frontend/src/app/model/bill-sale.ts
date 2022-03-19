import {Customer} from './customer';
import {Employee} from './employee';

export interface BillSale {
  billSaleId?: number;
  billSaleCode?: string;
  invoiceDate?: string;
  billSaleNote?: string;
  billSaleType?: string;
  flag?: boolean;
  totalMoney?: number;
  employee?: Employee;
  customer?: Customer;
  date?: string;
  time?: string;


}
