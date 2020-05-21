import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError, RoutesRecognized } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
declare var homeShow: (container, output) => any;

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

  navigationSubscription: any;

  constructor(private userService: UserService, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // console.log('Router方式:', event.url.substr(1));
        this.render();
      }
    });
  }

  render() {
    const container = document.getElementById('login_container');
    const output = document.getElementById('login_output');
    homeShow(container, output);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.render();
  }

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
      console.log(data);
      if (data != null && data.result) {
        this.loginResult = true;
        this.userID = data.userId;
        console.log('login successfully');
        this.router.navigate(['/home']);
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
