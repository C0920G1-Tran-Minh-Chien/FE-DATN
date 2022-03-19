import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DrugGroupDto} from '../../model/drug-group';
import {DrugGroupClientService} from '../../service/drug-group-client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {LoginRegisterComponent} from '../../user/user-component/login-register/login-register.component';
import {TokenStorageService} from '../../user/user-service/token-storage.service';
import {DrugCart} from "../../model/cart/drug-cart";
// ADD DRUG IN CART
const CART_KEY = 'drug-cart-id';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})
export class HeaderClientComponent implements OnInit, AfterViewChecked {
  drugGroups: DrugGroupDto[] = [];
  search: any;
  private roles: string[];
  isLoggedIn = false;
  username: string;
  ismod: boolean;
  totalProduct = 0;
  drugCartList: DrugCart[] = [];

  constructor(private drugGroupService: DrugGroupClientService, private router: Router,
              private route: ActivatedRoute, private dialog: MatDialog,
              private tokenStorageService: TokenStorageService,
              private cdref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getAllDrugGroup();
    this.getAllDrugGroup();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.accountName;

      // @ts-ignore
      this.ismod = (this.roles == 'ROLE_MODERATOR' || this.roles == 'ROLE_ADMIN')
    }
  }

  getAllDrugGroup() {
    this.drugGroupService.getAll().subscribe(next => {
      this.drugGroups = next;
    });
  }

  pressEnter($event: any) {
    this.router.navigate(['search', this.search], {relativeTo: this.route});
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  openDialogLogin() {
    let dialogRef = this.dialog.open(LoginRegisterComponent, {});
    dialogRef.afterClosed().subscribe(() => {

    });
  }


  ngAfterViewChecked(): void {
    this.cdref.detectChanges();
    if (this.totalProduct != 0) {

      this.totalProduct = 0;
    }
    this.drugCartList = JSON.parse(localStorage.getItem(CART_KEY));
    if (!this.drugCartList) {
      return;
    }
    for (let i = 0; i < this.drugCartList.length; i++) {
      this.totalProduct += this.drugCartList[i].count;
    }
    // fix error expressionchangedafterithasbeencheckederror
      this.cdref.detectChanges();
  }

}
