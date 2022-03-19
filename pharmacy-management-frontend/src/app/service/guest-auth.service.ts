import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {TokenStorageService} from "../user/user-service/token-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class GuestAuthService implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private matSnackBar: MatSnackBar) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenStorageService.getToken();

    if (token == null) {
      this.router.navigateByUrl('/');
      this.matSnackBar.open('Bạn cần đăng nhập để thực hiện tác vụ!', 'Ok', {
        duration: 4000,
      });
      return false;
    }
  }
}
