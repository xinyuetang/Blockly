import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Record } from 'src/app/models/record';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userID: number;
  userName: string;
  registerDate: string;

  records: Record[];
  displayedColumns: string[] = ['gameID', 'name', 'date', 'time', 'status'];
  dataSource: MatTableDataSource<Record>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUser(1);
    this.getRecords(1);
  }

  getUser(id: number): void {
    this.userService.getUser(id).subscribe((user) => {
      this.userID = user.id;
      this.userName = user.name;
      this.registerDate = user.date;
    });
  }

  getRecords(id: number): void {
    this.userService.getRecords(id).subscribe((records) => {
      this.records = records;
      this.dataSource = new MatTableDataSource(records);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
