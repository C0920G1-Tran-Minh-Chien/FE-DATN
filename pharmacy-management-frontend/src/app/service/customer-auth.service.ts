import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {TokenStorageService} from "../user/user-service/token-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthService implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private matSnackBar: MatSnackBar) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenStorageService.getToken();

    if (token == null) {
      this.router.navigateByUrl('/');
      this.matSnackBar.open('Bạn cần đăng nhập để thực hiện tác vụ!', 'Ok', {
        duration: 4000,
      });
      return false;
    } else if (!this.isRole()) {
      this.router.navigateByUrl('/');
      console.log("No quyền")
      this.matSnackBar.open('Bạn không có quyền truy cập trang này!', 'Ok', {
        duration: 4000,
      });
      return false;
    }
    return true;
  }

  isRole() {
    const tokenPayload = this.tokenStorageService.getAuthorities();
    console.log(tokenPayload);
    for (let role of tokenPayload) {
      if (role == "ROLE_ADMIN") {
        return true;
      }
    }
    return false
  }
}
