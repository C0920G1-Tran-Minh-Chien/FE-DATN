import {Role} from "./role";

export interface Account {
  id?: number;
  userName?: string;
  userCode?: string;
  accountName?: string;
  password?: string;
  roles?: Role[];
}
