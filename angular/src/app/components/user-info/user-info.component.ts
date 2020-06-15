import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {GameService} from 'src/app/services/game.service'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  // 获取用户信息结果
  userName: string;
  date: string;//注册日期
  email: string;
  // 获取用户操作记录结果
  records: [];
  // 用户操作记录展示
  displayedColumns: string[] = ['game', 'date', 'time', 'status'];
  dataSource: MatTableDataSource<any>;

  constructor(private userService: UserService,public gameService:GameService) {}

  ngOnInit(): void {
    this.getInformation();
    this.getRecords();
  }

  getInformation(): void {
    this.userService.getInformation().subscribe((data) => {
      console.log(data);
      if (data != null && data.result === true) {
        console.log(data);
        this.userName = data.userName;
        this.date = data.date;
        this.email = data.email;
      } else {
        alert('用户信息获取失败，' + data.message);
      }
    });
  }

  getRecords(): void {
    this.userService.getRecords().subscribe((data) => {
      console.log(data);
      if (data != null && data.result === true) {
        this.records = data.records;
        this.dataSource = new MatTableDataSource(this.records);
      } else {
        alert('操作记录获取失败，' + data.message);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
