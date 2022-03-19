

import {DrugGroup} from './drugGroup';
import {DrugImageDetail} from './drugImageDetail';

export interface Drug {
  drugId?: number;
  drugCode?: number;
  drugName?: string;
  drugFaculty?: string;
  activeElement?: string;
  // drugImageDetails?: DrugImageDetail[];
  unit?: string;
  conversionUnit?: string;
  conversionRate?: string;
  wholesaleProfitRate?: number;
  retailProfitRate?: number;
  manufacturer?: string;
  origin?: string;
  note?: string;
  drugSideEffect?: string;
  drugAmount?;
  flag?: true;
  drugGroup?: any;
  wholesalePrice?: number;
  retailPrice?: number;
  drugImageDetails?: string;
}
