import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import  authGuardGuard from './auth-guard.guard';
import { userprotectGuard } from './userprotect.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'login',component:LoginComponent, canActivate:[userprotectGuard]},
  { path: 'signup', component: SignupComponent , canActivate:[userprotectGuard]},
  { path: '', component: HomeComponent, canActivate: [authGuardGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuardGuard] },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
