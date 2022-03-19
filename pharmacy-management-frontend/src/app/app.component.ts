import { Component } from '@angular/core';
import {TokenStorageService} from "./user/user-service/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  flag = true;
  user;
  title = 'pharmacy-management-frontend';
  constructor(private tokenStorageService : TokenStorageService) {
    this.user = this.tokenStorageService.getUser();
    if (this.user == null){
      this.flag = true;
    }else {
      if (this.user.roles == "ROLE_USER"){
        this.flag = true;
      }else {
        this.flag = false;
      }
      console.log(this.user.roles)
    }
    console.log(this.flag);


  }


}
