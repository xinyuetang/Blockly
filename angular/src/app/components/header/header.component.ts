import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { UserService } from 'src/app/services/user.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  // 登出结果获取
  result: boolean;
  message: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout().subscribe((data) => {
      // console.log(data);
      if (data != null && data.result === true){
        this.result = data.result;
        this.message = data.message;
        this.router.navigate(['/home']);
      }else{
        this.result = data.result;
        this.message = data.message;
        // alert(this.message);
      }
    });
  }

}
