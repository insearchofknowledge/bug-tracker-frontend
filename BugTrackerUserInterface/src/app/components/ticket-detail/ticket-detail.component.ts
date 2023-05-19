import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TicketDetailed } from 'src/app/model/ticket/ticketDetailed';
import { SharedService } from 'src/app/services/shared.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  public noTicketSelected: boolean = true;
  public ticket: TicketDetailed;
  public errorMessage: String;
  public context: String;

  constructor(
    private ticketService: TicketService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    const preExistingTicketId = this.sharedService.getInitialTicketId();

    if(preExistingTicketId) {
      this.getTicketById(preExistingTicketId);
      this.noTicketSelected = false;
    }

    this.sharedService.getSelectedTicketId().subscribe(id => {
        console.log("we are inside ticket-detail component and the ticket id is: " +id);
        this.getTicketById(id);
        this.noTicketSelected = false;
    });
  }

  public getTicketById(ticketId: String): void {
    console.log("getTicketById method triggered: " + ticketId);
    this.ticketService.fetchTicketById(ticketId).subscribe({
      next: (response => this.ticket = response),
      
      error: (errorResponse: HttpErrorResponse) => {
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
