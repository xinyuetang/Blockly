import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd, NavigationStart } from '@angular/router';
import { forbiddenNameValidator, confirmPasswordValidator } from 'src/app/services/user-validator.directive';
declare var homeShow: (container, output) => any;



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userName = new FormControl('', [
    Validators.required,
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  confirmPassword = new FormControl('', [
    Validators.required,
    forbiddenNameValidator(/bob/i),
    confirmPasswordValidator(this.getPassword()),
  ]);

  hide = true;
  confirmHide = true;

  registerResult: boolean;
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
    const container = document.getElementById('register_container');
    const output = document.getElementById('register_output');
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

  getPassword(){
    return this.password.value;
  }

  onClear() {
    this.userName.patchValue('');
    this.password.patchValue('');
    this.confirmPassword.patchValue('');
  }

  onSubmit() {
    const name = this.userName.value;
    const password = this.password.value;
    this.register(name, password);
  }

  register(name: string, password: string): void {
    this.userService.register(name, password).subscribe((data) => {
      const user = data;
      if (user != null) {
        this.registerResult = true;
        this.userID = user.id;
        console.log('register successfully');
        console.log(user);
        this.router.navigate(['/']);
      } else {
        this.registerResult = false;
        console.log('fail to register');
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

  getConfirmPasswordErrorMessage() {
    if (this.confirmPassword.hasError('required')) {
      return 'Please confirm a valid password';
    }
    if (this.confirmPassword.hasError('comfirmPassword')) {
      return 'Please keep the same password as above';
    }
    return '';
  }

}




