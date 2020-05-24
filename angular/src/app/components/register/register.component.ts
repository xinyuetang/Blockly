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

  // 路由
  navigationSubscription: any;
  // 用户名必填
  userName = new FormControl('', [
    Validators.required,
  ]);
  //用户邮箱必填
  email = new FormControl('',[Validators.required,Validators.email]);
  // 密码必填，且大于等于6位
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  // 确认密码必填，且和密码一致
  confirmPassword = new FormControl('', [
    Validators.required,
    confirmPasswordValidator(this.password.value),
  ]);
  confirmHide = true;
  // 密码隐藏处理
  hide = true;
  // 注册结果获取
  result: boolean;
  message: string;
  userID: number;


  constructor(private userService: UserService, private router: Router) {
    // 监听路由切换
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.render();
      }
    });
  }

  ngOnInit(): void {
    this.render();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  // 背景渲染
  render() {
    const container = document.getElementById('register_container');
    const output = document.getElementById('register_output');
    homeShow(container, output);
  }

  onClear() {
    this.userName.patchValue('');
    this.password.patchValue('');
    this.confirmPassword.patchValue('');
  }

  onSubmit() {
    const name = this.userName.value;
    const password = this.password.value;
    const email  =  this.email.value;
    this.register(name, password,email);
  }

  register(name: string, password: string,email:string): void {
    this.userService.register(name, password,email).subscribe((data) => {
      console.log(data);
      if (data != null && data.result === true){
        this.result = data.result;
        this.message = data.message;
        this.router.navigate(['/login']);
      }else{
        this.result = data.result;
        this.message = data.message;
      }
    });
  }

  startConfirmValidator() {
    this.confirmPassword.setValidators(confirmPasswordValidator(this.password.value));
  }

  // 客户端输入验证-用户名
  getUserNameErrorMessage() {
    if (this.userName.hasError('required')) {
      return 'Please enter a valid userName';
    }
    return '';
  }
// 客户端输入验证-邮箱
  getEmailErrorMessage() {
    if (this.email.hasError('required')|| this.email.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
  }
  // 客户端输入验证-密码
  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Please enter a valid password';
    }
    if (this.password.hasError('minlength')) {
      return 'The password should be at least 6';
    }
    return '';
  }
  // 客户端输入验证-确认密码
  getConfirmPasswordErrorMessage() {
    if (this.confirmPassword.hasError('required')) {
      return 'Please confirm a valid password';
    }
    if (this.confirmPassword.hasError('comfirmPassword')) {
      return 'Please keep the same password as above';
    }
    return '';
  }
  // 服务端注册返回验证
  getRegisterErrorMessage() {
    if (this.result === false){
      return '注册失败，' + this.message;
    }
    return '';
  }

}




