import { Component, OnInit } from '@angular/core';
import { DrugGroupDto} from '../../model/drug-group';
import {DrugGroupClientService} from '../../service/drug-group-client.service';
import {Router} from '@angular/router';
import {LoginRegisterComponent} from '../../user/user-component/login-register/login-register.component';
import {MatDialog} from '@angular/material/dialog';
import {TokenStorageService} from '../../user/user-service/token-storage.service';

@Component({
  selector: 'app-footer-client',
  templateUrl: './footer-client.component.html',
  styleUrls: ['./footer-client.component.css']
})
export class FooterClientComponent implements OnInit {
  drugGroups: DrugGroupDto[] = [];
  private roles: string[];
  isLoggedIn = false;
  username: string;
  constructor(private drugGroupService: DrugGroupClientService,
              private router: Router,private dialog: MatDialog,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getAllDrugGroup();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.accountName;
    }
  }

  logout(){
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  getAllDrugGroup() {
    this.drugGroupService.getAll().subscribe(next => {
      this.drugGroups = next;
    });
  }

  openDialogLogin() {
    let dialogRef = this.dialog.open(LoginRegisterComponent, {

    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }
}
