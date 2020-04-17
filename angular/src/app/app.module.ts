import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientJsonpModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { BlocklyComponent } from './components/blockly/blockly.component';
import { HomeComponent } from './components/home/home.component';
import { ListOfGamesComponent} from './components/list-of-games/list-of-games.component';
import { QuickStartComponent } from './components/quick-start/quick-start.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VedioRoomComponent } from './components/vedio-room/vedio-room.component';
import { from } from 'rxjs';
import { AnimationComponent } from './components/animation/animation.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlocklyComponent,
    ListOfGamesComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    QuickStartComponent,
    UserInfoComponent,
    VedioRoomComponent,
    AnimationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientJsonpModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [BlocklyComponent],
  // schemas :[NO_ERRORS_SCHEMA]
})
export class AppModule { }
