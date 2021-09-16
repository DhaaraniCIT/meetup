import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'signin', component:LoginComponent },
  { path: 'signup', component:RegisterComponent },
  { path: 'Admin/login', component:LoginComponent },
  { path: ':userName/Dashboard', component:UserComponent },
  { path: 'Admin', component:AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
