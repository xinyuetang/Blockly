import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // 服务端获取数据异步处理
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DatePipe} from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = '/data/user';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };


  constructor(private http: HttpClient,private datePipe:DatePipe) {}

  // 获取用户个人信息
  getInformation(): Observable<any>{
    const url = `${this.userUrl}/information`;
    return this.http.get(url);
  }

  // 获取用户操作记录
  getRecords(): Observable<any>{
    const url = `${this.userUrl}/record`;
    return this.http.get(url);
  }

  // 通过name和password实现登录
  login(name: string, pass: string): Observable<any>{
    const url = `${this.userUrl}/login?userName=${name}&password=${pass}`;
    return this.http.get(url);
  }

  // 通过name、password实现注册
  register(name: string, pass: string, email: string): Observable<any>{
    const url = this.userUrl + '/register';
    let date =  this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const param = 'userName=' + name + '&password=' + pass + '&email=' + email+ '&date=' + date;
    // 参考链接 https://blog.csdn.net/qq_27466827/article/details/82803966
    return this.http.post(url, param, this.httpOptions);
  }

  // 实现登出
  logout(): Observable<any>{
    const url = `${this.userUrl}/logout`;
    return this.http.get(url);
  }
}


