import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-start-step',
  templateUrl: './start-step.component.html',
  styleUrls: ['./start-step.component.css']
})
export class StartStepComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StartStepComponent>) { }

  ngOnInit() { }

  onNoClick(){
    this.dialogRef.close();
  }

}
