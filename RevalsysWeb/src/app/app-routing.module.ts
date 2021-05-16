import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TestComponent } from './test/test.component';
import { UnauthorizedActiveGuard } from './unauthorized-active.guard';
import { AuthorizedActiveGuard } from './authorized-active.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { AdminPortalGuardGuard } from './admin-portal-guard.guard';
import { AddTestComponent } from './add-test/add-test.component';
import { StartTestComponent } from './start-test/start-test.component';
import { EndTestComponent } from './end-test/end-test.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [{path:'home',component:HomeComponent,canActivate:[UnauthorizedActiveGuard]},
{path:'login',component:LoginComponent,canActivate:[UnauthorizedActiveGuard]},
{path:'register',component:RegisterComponent,canActivate:[UnauthorizedActiveGuard]},
{path:'test',component:TestComponent,canActivate:[AuthorizedActiveGuard]},
{path:'starttest',component:StartTestComponent,canActivate:[AuthorizedActiveGuard]},
{path:'adminlogin',component:AdminLoginComponent,canActivate:[UnauthorizedActiveGuard]},
{path:'endtest',component:EndTestComponent,canActivate:[AuthorizedActiveGuard]},
{path:'adminportal',component:AdminPortalComponent,canActivate:[AdminPortalGuardGuard]},
{path:'result',component:ResultsComponent,canActivate:[AdminPortalGuardGuard]},
{path:'addtest',component:AddTestComponent,canActivate:[AdminPortalGuardGuard]},
{path:'',redirectTo:'/home',pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
