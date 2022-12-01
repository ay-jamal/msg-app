import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

interface AuthRespone {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  constructor(private http: HttpClient, private auth: Auth) {}

  signup(email: any, password: any) {
    return this.http.post<AuthRespone>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhCaSM306uUKqi9i4AJc6b1coDNh078o8',

      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  singIn(email: any, password: any) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBhCaSM306uUKqi9i4AJc6b1coDNh078o8',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
