import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  SignIpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private auth: AuthService) {}
  error = '';
  ngOnInit(): void {}

  get email() {
    return this.SignIpForm.get('email');
  }
  get password() {
    return this.SignIpForm.get('password');
  }

  onSubmit() {
    if (!this.SignIpForm.valid) {
      return;
    }
    const email = this.SignIpForm.value.email;
    const password = this.SignIpForm.value.password;
    this.auth.signup(email, password).subscribe(
      (data) => {
        console.log(data);
      },
      (errorRes) => {
        console.log(errorRes);
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            this.error = 'this email already exsist';
            alert('this email already exsist');
        }
      }
    );
    this.SignIpForm.reset();
  }
}
