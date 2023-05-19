import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DeveloperDetailed } from 'src/app/model/developer/developerDetailed';
import { DeveloperService } from 'src/app/services/developer.service';

@Component({
  selector: 'app-developer-detail',
  templateUrl: './developer-detail.component.html',
  styleUrls: ['./developer-detail.component.css']
})
export class DeveloperDetailComponent implements OnInit {

  public developer: DeveloperDetailed;
  public errorMessage: String;

  constructor(private developerService: DeveloperService) { }

  ngOnInit(): void {
    this.getDeveloperById("DEV-1");
  }

  getDeveloperById(developerId: String) {
    this.developerService.fetchDeveloperById(developerId).subscribe({
      next: (response => this.developer = response),
      error: (errorResponse: HttpErrorResponse ) => {
        this.errorMessage = "An error occured";

        // If a client-side or network error occurred:
        if (errorResponse.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${errorResponse.error.message}`;
        } else {
          // If the backend returned an unsuccessful response
          this.errorMessage = `Error Code: ${errorResponse.status} \n Message: ` + errorResponse.error;
        }
      }
    });
  }
}
