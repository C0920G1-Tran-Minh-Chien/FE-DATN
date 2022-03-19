import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../user/user-service/token-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../app.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private toast: ToastrService,
              private router: Router,
              private tokenStorageService: TokenStorageService) {

  }

  ngOnInit(): void {
  }

}
