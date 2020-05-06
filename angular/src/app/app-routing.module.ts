import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlocklyComponent } from './components/blockly/blockly.component';
import { ListOfGamesComponent } from './components/list-of-games/list-of-games.component';
import { QuickStartComponent } from './components/quick-start/quick-start.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path : 'home', component: HomeComponent},
  { path: 'list-of-games', component: ListOfGamesComponent },
  { path: 'quick-start', component: QuickStartComponent},
  { path: 'user-info', component:  UserInfoComponent},
  { path: 'game/:id', component: BlocklyComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
  
  

})

export class AppRoutingModule { }
