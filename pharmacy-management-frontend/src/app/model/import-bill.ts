import {Payment} from "./payment";

export interface ImportBill {
  importBillId?;
  importSystemCode?;
  accountingVoucher?;
  invoiceDate?;
  invoiceTime?;
  flag?: true;
  payment?: Payment;
  manufacturer?;
  employee?;


}
