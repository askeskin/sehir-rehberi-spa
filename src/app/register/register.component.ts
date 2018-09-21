import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { RegisterUser } from "../models/register-user";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerUser: any = {};
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        userName: ["", Validators.required],
        password: [
          "",
          [Validators.required,
          Validators.minLength(4),
          Validators.maxLength(9)]
        ],
        confirmPassword: [
          "",
          [Validators.required,
            Validators.minLength(4),
            Validators.maxLength(9)]
        ]
      },
      {
        validator: this.passwordMatchValidator
      }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { misMatch: true };
  }
  register() {
    if (this.registerForm.valid) {
      this.registerUser = Object.assign({}, this.registerForm.value);
      this.authService.register(this.registerUser);
    }
  }
}
