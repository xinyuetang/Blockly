import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserSharedService } from 'src/app/services/userShared.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private userService: UserService,
    private userSharedService: UserSharedService,
    private cookieService: CookieService) {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(){
    this.cookieLogin();
  }

  login(name: string, pass: string){
    this.userService.login(name, pass).subscribe((data) => {
      // console.log(data);
      if (data != null && data.result === true){
        this.userSharedService.isLogin.next(true);
        this.cookieService.set('loginName', name);
        this.cookieService.set('loginPass', pass);
      }
    });
  }

  // 使用cookie尝试登录持久化(自动登录)
  cookieLogin(){
    const loginName = this.cookieService.get('loginName');
    const loginPass = this.cookieService.get('loginPass');
    console.log('loginName: ' + loginName);
    console.log('loginPass: ' + loginPass);
    if (loginName !== ''  && loginPass !== ''){
      this.login(loginName, loginPass);
    }
  }
}
