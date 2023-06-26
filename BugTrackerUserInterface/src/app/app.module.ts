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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './components/error/error.component';
import { MyTicketListComponent } from './components/my-ticket-list/my-ticket-list.component';
import { InterceptorService } from './services/interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTicketFormComponent } from './components/create-ticket-form/create-ticket-form.component';

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
    MyTicketListComponent,
    LoginComponent,
    CreateTicketFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    // interceptor - intercepts all http requests and adds the authorisation header
    // to each request
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }