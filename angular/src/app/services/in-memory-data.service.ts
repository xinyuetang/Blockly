import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../models/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {id: 1, name: 'qq', password: '1111qq', date: '2020-03-01'},
      {id: 2, name: 'eee', password: '2222ee', date: '2020-03-02'},
      {id: 3, name: 'ss', password: 'ssssss', date: '2020-03-03'}
    ];
    const records = [
      {id: 1, userID: 1, gameID: 1, name: '收发室初级', date: '2020-04-01', time: '17:00:00', status: false},
      {id: 2, userID: 1, gameID: 1, name: '收发室初级', date: '2020-04-01', time: '19:00:00', status: true},
      {id: 3, userID: 1, gameID: 2, name: '收发室中级', date: '2020-04-02', time: '17:00:00', status: false},
      {id: 4, userID: 1, gameID: 3, name: '收发室高级', date: '2020-04-03', time: '17:00:00', status: false},
      {id: 5, userID: 3, gameID: 3, name: '收发室高级', date: '2020-04-03', time: '17:00:00', status: false},
    ];
    const history =   [
      {id: 0, userID:1,gameID: 0,history:""},
      {id: 1, userID:1,gameID: 1,history:""}

    ]
    
    return {users, records,history};
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
