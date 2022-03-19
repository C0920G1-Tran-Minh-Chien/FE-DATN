import {CustomerGroup} from './customer-group';

export interface Customer {
  customerId?: number;
  customerCode: string;
  customerName?: string;
  customerAge?: number;
  customerAddress?: string;
  customerPhone?: string;
  customerGroup: CustomerGroup;
  customerNote?: string;
  flag?: boolean;
}
