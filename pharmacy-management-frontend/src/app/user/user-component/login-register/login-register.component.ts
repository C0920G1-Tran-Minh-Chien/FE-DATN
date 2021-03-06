import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignupRequest} from '../../user-entity/signupRequest';
import {AuthService} from '../../user-service/auth.service';
import {TokenStorageService} from '../../user-service/token-storage.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  flag = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  formSignin: FormGroup;
  username: string;
  // register
  formRegister: FormGroup;
  signupRequest: SignupRequest;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
                private toastr: ToastrService) {
    this.formSignin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    if (this.tokenStorage.getToken()) {
      const user = this.tokenStorage.getUser();
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
    }

    this.formRegister = new FormGroup({
      username: new FormControl('', [Validators.required,Validators.minLength(5)]),
      accountName: new FormControl('', [Validators.required,Validators.minLength(5)]),
      email: new FormControl('', [Validators.required,Validators.minLength(5)]),
      password: new FormControl('', [Validators.required,Validators.minLength(5)]),
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    this.authService.login(this.formSignin.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.toastr.success('????ng nh???p th??nh c??ng', '????ng nh???p ', {
          timeOut: 2000,
          extendedTimeOut: 1500
        });
        this.reloadPage();
      },
      err => {
        this.toastr.error('Sai t??n t??i kho???n ho???c m???t kh???u.Vui l??ng ????ng nh???p l???i', '????ng nh???p ', {
          timeOut: 2000,
          extendedTimeOut: 1500
        });
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(this.formSignin.value);
      }
    );
  }

  onSubmitRegister() {
    this.signupRequest = this.formRegister.value;
    this.authService.register(this.signupRequest).subscribe(() => {
        this.toastr.success('????ng k?? th??nh c??ng', '????ng k?? ', {
          timeOut: 2000,
          extendedTimeOut: 1500
        });
      },
      err => {
        this.toastr.error('C??c tr?????ng d??? li???u ph???i ????ng format', '????ng k?? ', {
          timeOut: 2000,
          extendedTimeOut: 1500
        });

      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  openRegister() {
    if (this.flag == true) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  }

}
