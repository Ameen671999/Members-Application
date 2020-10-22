import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MembersComponent } from './members/members.component';
import { MembersDetailComponent } from './members/members-detail/members-detail.component';
import { MembersEditComponent } from './members/members-edit/members-edit.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MembersTabComponent } from './members/members-list/members-tab/members-tab.component';
import { MembersStartComponent } from './members/members-start/members-start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MembersComponent,
    MembersDetailComponent,
    MembersEditComponent,
    MembersListComponent,
    MembersTabComponent,
    MembersStartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
