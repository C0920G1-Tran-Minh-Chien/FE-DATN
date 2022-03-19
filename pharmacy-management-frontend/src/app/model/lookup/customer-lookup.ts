import {CustomerGroupLookup} from './customer-group-lookup';

export interface CustomerLookup {


  customerAddress?: string;
  customerAge?: number;
  customerCode?: string;
  customerId?: number;
  customerName?: string;
  customerNote?: string;
  customerPhone?: string;
  customerGroup?: CustomerGroupLookup
  flag?: boolean;
}
