import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';


const routes: Routes = [
  {
    path:'',
   component: UserRolesComponent},
   {
     path:'user',
     component: UserViewComponent
   },
   {
     path:'admin',
     component: AdminViewComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
