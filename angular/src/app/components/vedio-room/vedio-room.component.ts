import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, ValidatorFn, AbstractControl } from '@angular/forms';
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
    if (this.roomId.hasError('required')||this.roomId.hasError('maxLength')||this.roomId.hasError('minLength')) {
      return '房间号为8位字符串';
    }
    return '';

  }

}
