import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersDetailComponent } from './members/members-detail/members-detail.component';
import { MembersEditComponent } from './members/members-edit/members-edit.component';
import { MembersStartComponent } from './members/members-start/members-start.component';
import { MembersComponent } from './members/members.component';

const appRoutes: Routes =[
  { path: '', redirectTo: '/members' , pathMatch:'full'},//only redirect if full path is empty
  {path: 'members' , component: MembersComponent ,children:[
    {path:'' , component: MembersStartComponent},
    {path: 'new' , component: MembersEditComponent },//after id (new) will be affected
    {path:':id' , component: MembersDetailComponent}
    ,
      {
        path: ':id/edit',
        component: MembersEditComponent,
        // resolve: [RcipesResolverService]
      }
  ]}
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
