import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, ValidatorFn, AbstractControl } from '@angular/forms';
// import {io} from './socket.io.js';
import {login, linkRemoteRoom} from './client.js';

@Component({
  selector: 'app-vedio-room',
  templateUrl: './vedio-room.component.html',
  styleUrls: ['./vedio-room.component.css']
})
export class VedioRoomComponent implements OnInit {
  roomId = new FormControl('', [
    Validators.required,
    Validators.maxLength(8),
    Validators.minLength(8)
  ]);


  constructor() { }

  ngOnInit(): void {
     // 房间号必填，且等于8位

  }
  getRoomIdErrorMessage(){
    if (this.roomId.hasError('required') || this.roomId.hasError('maxLength') || this.roomId.hasError('minLength')) {
      return '房间号为8位字符串';
    }
    return '';
  }
  createRoom() {
    const roomName = this.randomString();
    login(roomName);
    this.roomId.setValue(roomName);
    alert(`Room Created!\nRoom ID:\n ${roomName}`);
  }

  connectRemoteRoom() {
    const remoteId = this.roomId.value;
    login(this.randomString());
    linkRemoteRoom(remoteId);
    alert(`Room Connected!\nRoom ID:\n ${remoteId}`);
  }

  randomString(){
    const str = `ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678`;
    const tempLen = str.length;
    let tempStr = ``;
    for (let i = 0; i < 8; ++i){
      tempStr += str.charAt(Math.floor(Math.random() * tempLen ));
    }
    return tempStr;
  }
}


/*
function createRoom() {
  const roomName = randomString();
  login(roomName);
  this.roomId = roomName;
  alert(`Room Created!\nRoom ID:\n ${roomName}`);
}
*/

/*
function connectRemoteRoom() {
  login(randomString());
  linkRemoteRoom(this.roomId);
}
*/

