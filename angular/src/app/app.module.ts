import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
// import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
// import {InMemoryDataService} from './services/in-memory-data.service';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import {DatePipe} from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { BlocklyComponent, DialogComponent} from './components/blockly/blockly.component';
import { HomeComponent } from './components/home/home.component';
import { ListOfGamesComponent} from './components/list-of-games/list-of-games.component';
import { QuickStartComponent } from './components/quick-start/quick-start.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VedioRoomComponent } from './components/vedio-room/vedio-room.component';
import { AnimationComponent } from './components/animation/animation.component';
import { StartStepComponent } from './components/start-step/start-step.component';
import { from } from 'rxjs';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlocklyComponent,
    DialogComponent,
    ListOfGamesComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    QuickStartComponent,
    UserInfoComponent,
    VedioRoomComponent,
    AnimationComponent,
    StartStepComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatListModule,
    MatStepperModule
  ],
  entryComponents: [
    DialogComponent,
    StartStepComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    DatePipe,
    CookieService
  ],
  bootstrap: [AppComponent],
  exports: [BlocklyComponent],
})
export class AppModule { }
