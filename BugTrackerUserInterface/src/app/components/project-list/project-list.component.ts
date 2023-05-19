import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProjectSimplified } from 'src/app/model/project/projectSimplified';
import { ProjectServiceService } from 'src/app/services/project-service.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  
  public myProjects: ProjectSimplified[];
  public errorMessage: string;

  constructor(
    private projectService: ProjectServiceService
  ) { }

  ngOnInit(): void {
    this.getAllMyProjects("DEV-2");
  }

  public getAllMyProjects(developerId: String): void {
    this.projectService.fetchAllMyProjects(developerId).subscribe({
      next: (response: ProjectSimplified[]) => { 
        this.myProjects = response;
      },
      error: (errorResponse: HttpErrorResponse) => { 
        this.errorMessage = "An error occurred";
       
        // If a client-side or network error occurred:
        if (errorResponse.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${errorResponse.error.message}`;
        } else {
          // If the backend returned an unsuccessful response
          this.errorMessage = `Error Code: ${errorResponse.status} \nMessage: ` + errorResponse.error; // extract message from errorResponse
          console.log(this.errorMessage);
        }
      }
    });
  }

}
