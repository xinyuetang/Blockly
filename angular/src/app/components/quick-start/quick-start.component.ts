import { Component, OnInit, Inject } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StartStepComponent} from '../start-step/start-step.component';

@Component({
  selector: 'app-quick-start',
  templateUrl: './quick-start.component.html',
  styleUrls: ['./quick-start.component.css'],
})
export class QuickStartComponent implements OnInit {

  dialogRef: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.openDialog();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.closeDialog();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(StartStepComponent, {
      height: '550px',
      width: '950px',
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
