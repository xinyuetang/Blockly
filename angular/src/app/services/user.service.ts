import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Record } from '../models/record';
import { Observable, of, from } from 'rxjs'; // 服务端获取数据异步处理
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import * as Global from '../../assets/data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = `${Global.server}/data/user`;
  private recordUrl = 'api/records';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) {}

  // 通过用户ID获取用户个人信息
  getUser(id: number): Observable<User>{
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url);
  }

  // 通过用户ID获取用户操作记录
  getRecords(id: number): Observable<Record[]>{
    const url = `${this.recordUrl}/?userID=${id}`;
    return this.http.get<Record[]>(url);
  }

  // 通过name和password实现登录
  login(name: string, password: string): Observable<User>{
    const url = `${this.userUrl}/login?userName=${name}&password=${password}`;
    return this.http.get<User>(url);
  }

  // 通过name、password实现注册
  register(name: string, password: string){
    const url = `${this.userUrl}/register`;
    let body = {"userName":name,"password":password};
    console.log(body);
    return this.http.post(url, body,this.httpOptions);
  }

  // 异常处理及报错
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(`UserService: ${message}`);
  }
}


