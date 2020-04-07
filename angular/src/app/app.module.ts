import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientJsonpModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BlocklyComponent } from './components/blockly/blockly.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlocklyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientJsonpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [BlocklyComponent]
})
export class AppModule { }
