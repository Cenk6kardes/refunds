import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { LoginComponent } from './authentication/login/login.component';
import { RefundDataTableComponent } from './refund-data-table/refund-data-table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/refund-data-table',
    pathMatch:'full'
  },

  {    
      path: "refund-data-table",
    component: RefundDataTableComponent,
    canActivate: [AuthGuard], 
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path: '404',
    component:NotFoundPageComponent
  },
  {
    path:'**',
    redirectTo:'/404'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
