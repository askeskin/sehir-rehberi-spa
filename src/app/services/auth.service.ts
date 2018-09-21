import { Injectable } from "@angular/core";
import { LoginUser } from "../models/login-user";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import { Router } from "@angular/router";
import { AlertifyService } from "./alertify.service";
import { RegisterUser } from "../models/register-user";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  path = "http://localhost:4472/api/auth/";

  jwtHelper: JwtHelper = new JwtHelper();
  TOKEN_KEY = "token";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.path + "login", loginUser, { headers: headers })
      .subscribe(data => {
        debugger;
        this.saveToken(data["tokenString"]);
        this.alertifyService.success("Sisteme Giriş Yapıldı");
        this.router.navigateByUrl("/city");
      });
  }

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.path + "register", registerUser, { headers: headers })
      .subscribe(data => {
        this.alertifyService.success("Sisteme Kayıt Yapıldı");
      });
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.alertifyService.warning("Çıkış Yapıldı");
  }

  loggedIn() {
    return tokenNotExpired(this.TOKEN_KEY);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  get decodedToken() {
    return this.jwtHelper.decodeToken(this.token);
  }
  getCurrentUserId() { 
    return this.decodedToken.nameid;
  }
}
