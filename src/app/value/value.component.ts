import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Value } from "../models/value";
@Component({
  selector: "app-value",
  templateUrl: "./value.component.html",
  styleUrls: ["./value.component.css"]
})
export class ValueComponent implements OnInit {
  values: Value[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getValues().subscribe(data => (this.values = data));
  }
  getValues() {
    return this.http.get<Value[]>("http://localhost:4472/api/values");
  }
}
