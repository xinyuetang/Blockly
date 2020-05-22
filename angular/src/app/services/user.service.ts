import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Record } from '../models/record';
import { Observable, of, from } from 'rxjs'; // 服务端获取数据异步处理
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import * as Global from '../../assets/data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = `${Global.server}/data/user`;
  private recordUrl = 'api/records';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };


  constructor(private http: HttpClient) {}

  // 获取用户个人信息
  getInformation(): Observable<any>{
    const url = `/data/user/information`;
    return this.http.get(url);
  }

  // 获取用户操作记录
  getRecords(): Observable<any>{
    const url = `/data/user/record`;
    return this.http.get(url);
  }

  // 通过name和password实现登录
  login(name: string, pass: string): Observable<any>{
    const url = `/data/user/login?userName=${name}&password=${pass}`;
    return this.http.get(url);
  }

  // 通过name、password实现注册
  register(name: string, pass: string): Observable<any>{
    const url = '/data/user/register';
    const param = 'userName=' + name + '&password=' + pass;
    // 参考链接 https://blog.csdn.net/qq_27466827/article/details/82803966
    return this.http.post(url, param, this.httpOptions);
  }

  // 实现登出
  logout(): Observable<any>{
    const url = `/data/user/logout`;
    return this.http.get(url);
  }
}


