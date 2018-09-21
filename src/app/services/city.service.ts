import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { City } from "../models/city";
import { Photo } from "../models/Photo";
import { AlertifyService } from "./alertify.service";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class CityService {
  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router,
    private authService: AuthService
  ) {}

  path = "http://localhost:4472/api/";
  headers = { Authorization: "Bearer " + this.authService.token };

  getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.path + "cities", {
      headers: this.headers
    });
  }

  getCityById(cityId): Observable<City> {
    return this.httpClient.get<City>(this.path + "cities/detail?id=" + cityId, {
      headers: this.headers
    });
  }

  getPhotosByCity(cityId): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(
      this.path + "cities/photos?cityId=" + cityId,
      { headers: this.headers }
    );
  }

  add(city: City) {
    this.httpClient
      .post(this.path + "cities/add", city, { headers: this.headers })
      .subscribe(data => {
        this.alertifyService.success("eklendi");
        this.router.navigateByUrl("/cityDetail/" + data["id"]);
      });
  }
}
