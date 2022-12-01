import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.auth.singIn(email, password).subscribe(
      (data) => {
        console.log(data);
        this.auth.isLoggedIn = true;

        this.route.navigate(['home']);
      },
      (errorRes) => {
        console.log(errorRes);
        this.auth.isLoggedIn = false;
      }
    );
  }
}
