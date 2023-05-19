import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TicketSimplified } from 'src/app/model/ticket/ticketSimplified';
import { SharedService } from 'src/app/services/shared.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-my-ticket-list',
  templateUrl: './my-ticket-list.component.html',
  styleUrls: ['./my-ticket-list.component.css']
})
export class MyTicketListComponent implements OnInit {

  public developerId: String = "DEV-1";
  public ticketsCreatedByMe: TicketSimplified[];
  public ticketsAssignedToMe: TicketSimplified[];
  public errorMessage: String;

  // for setting the context for the ticket-list in the sharedService
  public ticketListContext: String = "myTicketList";

  constructor(
    private ticketService: TicketService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getTicketsCreatedByMe(this.developerId);
    this.getTicketsAssignedToMe(this.developerId);
    // setting the context for the ticket-list in the sharedService
    this.sharedService.setContextForTicketList(this.ticketListContext);
  }

  getTicketsCreatedByMe(devId: String): void {
    this.ticketService.fetchTicketsByDeveloperId(devId).subscribe({
      next: (response: TicketSimplified[]) => {
        this.ticketsCreatedByMe = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.errorMessage = "An error occured";
        
        // If a client-side or network error occurred:
        if (errorResponse.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${errorResponse.error.message}`; 
        } else {
          // If the backend returned an unsuccessful response
          this.errorMessage = `Error Code: ${errorResponse.status} \nMessage: ` + errorResponse.error; // extract message from errorResponse
        }
      }
    });
  }

  getTicketsAssignedToMe(devId: String): void {
    this.ticketService.fetchTicketsAssignedToDev(devId).subscribe({
      next: (response: TicketSimplified[]) => {
        this.ticketsAssignedToMe = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.errorMessage = "An error occured";
        
        // If a client-side or network error occurred:
        if (errorResponse.error instanceof ErrorEvent) {
          this.errorMessage = `Error: ${errorResponse.error.message}`; 
        } else {
          // If the backend returned an unsuccessful response
          this.errorMessage = `Error Code: ${errorResponse.status} \nMessage: ` + errorResponse.error; // extract message from errorResponse
        }
      }
    })
  }

}
