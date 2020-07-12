import { Component, OnInit } from "@angular/core";
import { User } from "../user";
import { UserService } from "../user.service";
import Swal from "sweetalert2";
import swal from "sweetalert2";

import { FormGroup, Validators, FormBuilder } from "@angular/forms";
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users: User[];
  title = "User List";
  submitted: boolean = false;
  public registerForm: FormGroup;
  constructor(private userService: UserService, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    this.getUsers();
  }
  buildForm() {
    this.registerForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      phone: ["", Validators.required],
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  getUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      console.log(this.users);
    });
  }

  add(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.userService
        .add(this.registerForm.value)
        .subscribe((user) => this.users.push(user));
      this.submitted = false;
      this.registerForm.reset();
    }
  }

  delete(user: User): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.users = this.users.filter((u) => u !== user);
        this.userService.delete(user).subscribe();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
}
