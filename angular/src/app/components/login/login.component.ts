import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, NavigationEnd } from '@angular/router';
declare var homeShow: (container, output) => any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // 路由
  navigationSubscription: any;
  // 用户名必填
  userName = new FormControl('', [
    Validators.required,
  ]);
  // 密码必填，且大于等于6位
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  // 密码隐藏处理
  hide = true;
  // 登录结果获取
  result: boolean;
  message: string;
  userId: number;

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
    const container = document.getElementById('login_container');
    const output = document.getElementById('login_output');
    homeShow(container, output);
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
      // console.log(data);
      if (data != null && data.result === true){
        this.result = data.result;
        this.message = data.message;
        this.userId = data.userId;
        this.router.navigate(['/home']);
      }else{
        this.result = data.result;
        this.message = data.message;
      }
    });
  }

  // 客户端输入验证-用户名
  getUserNameErrorMessage() {
    if (this.userName.hasError('required')) {
      return 'Please enter a valid userName';
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
  // 服务端登录返回验证
  getLoginErrorMessage() {
    if (this.result === false){
      return '登录失败，' + this.message;
    }
    return '';
  }

}
