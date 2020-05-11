import { Component, OnInit, Input } from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';
declare var gameOne: any;
declare var gameTwo: any;

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})

export class AnimationComponent implements OnInit {

  // 接收父组件的值
  @Input() gameID: number;

  ngOnInit(): void {
    console.log(this.gameID);
  }

  clear(){
    if (this.gameID === 0){
      console.log('clear0');
      this.clearOne();
    }else if (this.gameID === 1){
      this.clearTwo();
      console.log('clear1');
    }
  }

  run(code: string){
    if (this.gameID === 0){
      this.runOne(code);
    }else if (this.gameID === 1){
      this.runTwo(code);
    }
  }

  clearOne(){
    const letterA = document.getElementById('letterA');
    const letterB = document.getElementById('letterB');
    const letterC = document.getElementById('letterC');
    letterA.style.setProperty('transform', 'translate(' + 0 + 'px, ' + 0 + 'px)');
    letterB.style.setProperty('transform', 'translate(' + 0 + 'px, ' + 0 + 'px)');
    letterC.style.setProperty('transform', 'translate(' + 0 + 'px, ' + 0 + 'px)');
  }

  clearTwo(){
      const letterF0 = document.getElementById('letterF0');
      const letterE = document.getElementById('letterE');
      const letterO = document.getElementById('letterO');
      const letterF1 = document.getElementById('letterF1');
      const letterT = document.getElementById('letterT');
      const letterR = document.getElementById('letterR');
      letterF0.style.setProperty('transform', 'translate(' + 0 + 'px, ' + 0 + 'px)');
      letterE.style.setProperty('transform', 'translate(' + 0 + 'px, ' + 0 + 'px)');
      letterO.style.setProperty('transform', 'translate(' + 0 + 'px, ' + 0 + 'px)');
      letterF1.style.setProperty('transform', 'translate(' + 0 + 'px, ' + 0 + 'px)');
      letterT.style.setProperty('transform', 'translate(' + 0 + 'px, ' + 0 + 'px)');
      letterR.style.setProperty('transform', 'translate(' + 0 + 'px, ' + 0 + 'px)');
  }

  runOne(code: string) {
    this.clearOne();

    const employee = document.getElementById('employee');
    const letterA = document.getElementById('letterA');
    const letterB = document.getElementById('letterB');
    const letterC = document.getElementById('letterC');

    if (code === '10') {
      gameOne(employee, letterA, 0);
    } else if (code === '1010') {
      gameOne(employee, letterA, 0).onComplete(() => {
        gameOne(employee, letterB, 1);
      });
    } else if (code === '101010') {
      gameOne(employee, letterA, 0).onComplete(() => {
        gameOne(employee, letterB, 1).onComplete(() => {
          gameOne(employee, letterC, 2);
        });
      });
    }
  }

  runTwo(code: string) {
    this.clearTwo();

    const employee = document.getElementById('employee');
    const letterF0 = document.getElementById('letterF0');
    const letterE = document.getElementById('letterE');
    const letterO = document.getElementById('letterO');
    const letterF1 = document.getElementById('letterF1');
    const letterT = document.getElementById('letterT');
    const letterR = document.getElementById('letterR');

    if (code === '141232') {
      gameTwo(employee, letterF0, letterE, 0);
    }else if (code === '141232141232'){
      gameTwo(employee, letterF0, letterE, 0).onComplete(() => {
        gameTwo(employee, letterO, letterF1, 1);
      });
    }else if (code === '141232141232141232'){
      gameTwo(employee, letterF0, letterE, 0).onComplete(() => {
        gameTwo(employee, letterO, letterF1, 1).onComplete(() => {
          gameTwo(employee, letterT, letterR, 2);
        });
      });
    }
  }
}
