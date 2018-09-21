import { Component, OnInit } from "@angular/core";
import { CityService } from "../../services/city.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { City } from "../../models/city";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: "app-city-add",
  templateUrl: "./city-add.component.html",
  styleUrls: ["./city-add.component.css"]
})
export class CityAddComponent implements OnInit {
  cityAddForm: FormGroup;
  city: City;

  constructor(
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private authService:AuthService
  ) {}

  ngOnInit() {
    this.createCityForm();
  }
  createCityForm() {
    this.cityAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required]
    });
  }

  add() {
    if (this.cityAddForm.valid) {
      this.city = Object.assign({}, this.cityAddForm.value);
      //todo 
      this.city.userId =this.authService.getCurrentUserId() ;
      
      this.cityService.add(this.city);
      
    }
  }
}
