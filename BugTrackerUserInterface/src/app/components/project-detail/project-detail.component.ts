import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectDetailed } from 'src/app/model/project/projectDetailed';
import { ProjectServiceService } from 'src/app/services/project-service.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  public project: ProjectDetailed;
  public errorMessage: String;

  // for setting the context for the ticket-list in the sharedService
  public ticketListContext: String = "projectDetail";

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectServiceService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    // we get the id of the project we clicked on from the project-list.component
    // so that it can be passed to the getProjectById();
    const projectId = this.route.snapshot.paramMap.get('id');
    this.getProjectById(projectId);
    
    // setting the context for the ticket-list in the sharedService
    // since we made it to this component we only need to load ticket-details from now on
    this.sharedService.setContextForTicketList(this.ticketListContext);
  }

  getProjectById(projectId: String): void {
     
    this.projectService.fetchProjectById(projectId).subscribe({
      next: (response => this.project = response),
      error: (errorResponse: HttpErrorResponse) => {
        this.errorMessage = "An error occured";

        // If a client-side or network error occurred:
        if (errorResponse.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${errorResponse.error.message}`;
        } else {
          // If the backend returned an unsuccessful response
          this.errorMessage = `Error Code: ${errorResponse.status} \n Message: ` +errorResponse.error;
        }
      }
    });
  }
}
