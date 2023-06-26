import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { MyTicketListComponent } from './components/my-ticket-list/my-ticket-list.component';
import { DeveloperDetailComponent } from './components/developer-detail/developer-detail.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'projectDetails/:id', component: ProjectDetailComponent },
  { path: 'myTickets', component: MyTicketListComponent },
  { path: 'profile', component: DeveloperDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
