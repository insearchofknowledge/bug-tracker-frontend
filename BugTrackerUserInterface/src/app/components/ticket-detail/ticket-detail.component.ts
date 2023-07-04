import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DeveloperSimplified } from 'src/app/model/developer/developerSimplified';
import { TicketPriority } from 'src/app/model/ticket/enums/ticketPriority';
import { TicketStatus } from 'src/app/model/ticket/enums/ticketStatus';
import { TypeOfTicket } from 'src/app/model/ticket/enums/typeOfTicket';
import { TicketDetailed } from 'src/app/model/ticket/ticketDetailed';
import { UpdateTicketSingleField } from 'src/app/model/ticket/updateTicketSingleField';
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
  public context: String;

  public errorMessage: String;
  
  // the following fields are needed to update a single field of a ticket:
  public dataOfSingleFieldUpdate: UpdateTicketSingleField;
  public editMode = {
    title: false,
    description: false,
    typeOfTicket: false,
    ticketPriority: false,
    ticketStatus: false,
    devsAssigned: false
  };
  public TypeOfTicket = TypeOfTicket;
  public TicketPriority = TicketPriority;
  public TicketStatus = TicketStatus;
  @Input() devsAssigned: DeveloperSimplified[];

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


  // toggling edit mode for a single field of a ticket
  toggleEditMode(fieldKey: string) {
    this.editMode[fieldKey] = !this.editMode[fieldKey];
    console.log("toggleEditMode triggered ", fieldKey, ": ", this.editMode[fieldKey] );
  }

  // setting the value of the updateDto to the value defined by the user
  updateFieldValue(newValue: TypeOfTicket | TicketPriority | TicketStatus | string | any | any[]) {
    console.log("updateFieldValue triggered");
    this.dataOfSingleFieldUpdate = new UpdateTicketSingleField();
    if (this.editMode.devsAssigned) {
      this.dataOfSingleFieldUpdate.fieldValue = newValue; // this comes as an array of strings by default so we must not use .toString()
    } else {
    this.dataOfSingleFieldUpdate.fieldValue = newValue.toString();
    }
    
  }

  updateSingleField(fieldName: string) {
    console.log("updateSingleField triggered.....")
    this.dataOfSingleFieldUpdate.fieldName = fieldName;
    console.log("updateTIcketDto flield name: ", this.dataOfSingleFieldUpdate.fieldName);
    const ticketId = this.ticket.id;
    this.ticketService.patchTicketSingleField(ticketId, this.dataOfSingleFieldUpdate).subscribe({
      next: (response ) => {
        this.ticket = response;
        this.editMode[fieldName] = false;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }

  // takes an enum object as an argument and returns an array of its string values. 
  // We cast the Object.values(enumObject) result to string[] since enums can have numeric values as well.
  public enumValues(enumObject: any): string[] {
    return Object.values(enumObject) as string[];
  }
}
