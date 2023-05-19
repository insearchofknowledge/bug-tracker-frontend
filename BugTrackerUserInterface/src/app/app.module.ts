import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerticalNavBarComponent } from './components/vertical-nav-bar/vertical-nav-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { DeveloperListComponent } from './components/developer-list/developer-list.component';
import { DeveloperDetailComponent } from './components/developer-detail/developer-detail.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './components/error/error.component';
import { MyTicketListComponent } from './components/my-ticket-list/my-ticket-list.component';

@NgModule({
  declarations: [
    AppComponent,
    VerticalNavBarComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    TicketListComponent,
    TicketDetailComponent,
    DeveloperListComponent,
    DeveloperDetailComponent,
    CommentListComponent,
    ErrorComponent,
    MyTicketListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
