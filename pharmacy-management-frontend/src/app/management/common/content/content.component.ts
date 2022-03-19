import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../user/user-service/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css', '../../../app.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,
              private router : Router) { }

  ngOnInit(): void {
  }
  logout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('');
    window.location.reload();
  }

}
