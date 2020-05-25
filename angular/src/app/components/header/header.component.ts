import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserSharedService } from 'src/app/services/userShared.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  // 登出结果获取
  result: boolean;
  message: string;
  // 登录判断
  isLogin: boolean;

  constructor(
    private userService: UserService,
    private userSharedService: UserSharedService,
    private router: Router,
    private cookieService: CookieService) {}

  ngOnInit(){
    this.userSharedService.isLogin.subscribe(data => {
      this.isLogin = data;
      console.log(this.isLogin);
    });
  }

  logout(){
    this.userService.logout().subscribe((data) => {
      // console.log(data);
      if (data != null && data.result === true){
        this.result = data.result;
        this.message = data.message;
        this.userSharedService.isLogin.next(false);
        this.router.navigate(['/home']);
        this.cookieService.set('loginName', '');
        this.cookieService.set('loginPass', '');
      }else{
        this.result = data.result;
        this.message = data.message;
        // alert(this.message);
      }
    });
  }

}
