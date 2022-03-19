import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "../../../user/user-service/token-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css", "../../../app.component.css"],
})
export class NavbarComponent implements OnInit {
  username: string;
  user;
  roles;
  flag = false;
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {
    this.user = this.tokenStorageService.getUser();
    this.username = this.user.accountName;
    this.roles = this.user.roles;
  }
  logout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl("/");
    window.location.reload();
  }
  checkFlag() {
    if (this.roles == "ROLE_ADMIN") {
      this.flag = true;
    } else {
      this.flag = false;
    }
  }

  ngOnInit(): void {
    this.checkFlag();
    console.log(this.flag);
  }
}
