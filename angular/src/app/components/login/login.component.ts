import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  userName = new FormControl('', [
    Validators.required,
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  hide = true;

  loginResult: boolean;
  userID: number;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {}

  onClear() {
    this.userName.patchValue('');
    this.password.patchValue('');
  }

  onSubmit() {
    const name = this.userName.value;
    const password = this.password.value;
    this.login(name, password);
  }

  login(name: string, password: string): void {
    this.userService.login(name, password).subscribe((data) => {
      const user = data[0];
      if (user != null) {
        this.loginResult = true;
        this.userID = user.id;
        console.log('login successfully');
        console.log(user);
        this.router.navigate(['/']);
      } else {
        this.loginResult = false;
        console.log('fail to login');
      }
    });
  }

  getUserNameErrorMessage() {
    if (this.userName.hasError('required')) {
      return 'Please enter a valid userName';
    }
    return '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Please enter a valid password';
    }
    if (this.password.hasError('minlength')) {
      return 'The password should be at least 6';
    }
    return '';
  }

}
