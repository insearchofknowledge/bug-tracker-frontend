import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeveloperSimplified } from 'src/app/model/developer/developerSimplified';
import { AddTicket } from 'src/app/model/ticket/addTicket';
import { TicketPriority } from 'src/app/model/ticket/enums/ticketPriority';
import { TicketStatus } from 'src/app/model/ticket/enums/ticketStatus';
import { TypeOfTicket } from 'src/app/model/ticket/enums/typeOfTicket';
import { TicketSimplified } from 'src/app/model/ticket/ticketSimplified';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-create-ticket-form',
  templateUrl: './create-ticket-form.component.html',
  styleUrls: ['./create-ticket-form.component.css']
})
export class CreateTicketFormComponent implements OnInit {

  public errorMessage: String;

  // we need these to be able to add them to the create ticket form
  // these will be supplied by the ProjectDetailComponent (grandparent) -> TicketListComponent (parent)
  @Input() projectId: String;
  @Input() projectTeam: DeveloperSimplified[];

  //we will send the newly created ticket from the response body to be added to the Ticket[] from the ticketList component
  // we will take advantage of return type in the response body and update the ticket[] without any unnecessary queries
  @Output() newTicketResponse: EventEmitter<TicketSimplified> = new EventEmitter<TicketSimplified>();

  // we need this to emit an event which will trigger the boolean flag, in the parent component, for the popup to be displayed or not
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  ticketForm: FormGroup;
  ticketPriorities: TicketPriority[] = [
    TicketPriority.LOW,
    TicketPriority.MEDIUM,
    TicketPriority.HIGH,
    TicketPriority.URGENT
  ];
  ticketStatuses: TicketStatus[] = [
    TicketStatus.NEW,
    TicketStatus.IN_PROGRESS,
    TicketStatus.RESOLVED,
    TicketStatus.ADDITIONAL_INFO_REQUIRED,
    TicketStatus.CLOSED
  ];
  ticketTypes: TypeOfTicket[] = [
    TypeOfTicket.BUG,
    TypeOfTicket.FEATURE_REQUEST,
    TypeOfTicket.ISSUE,
    TypeOfTicket.OTHER
  ];
  
  constructor(
    private formBuilder: FormBuilder, 
    private ticketService: TicketService,
    ) { 
  }

  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      typeOfTicket: ['', Validators.required],
      ticketPriority: ['', Validators.required],
      ticketStatus: ['', Validators.required],
      devsAssigned: [[]],
      project: [this.projectId, Validators.required]
    });
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      console.log("on submit clicked... it seems to be working")
      const newTicket: AddTicket = {
        title: this.ticketForm.value.title,
        description: this.ticketForm.value.description,
        typeOfTicket: this.ticketForm.value.typeOfTicket,
        ticketPriority: this.ticketForm.value.ticketPriority,
        ticketStatus: this.ticketForm.value.ticketStatus,
        devsAssigned: this.ticketForm.value.devsAssigned.map(String),
        project: this.ticketForm.value.project
      };
      console.log(newTicket);

      this.ticketService.addTicket(newTicket).subscribe({
        next: (response => {
          this.newTicketResponse.emit(response);
          this.ticketForm.reset();
        }),
        error: (errorResponse: HttpErrorResponse) => {
          this.errorMessage = "An error occured";
          console.log(errorResponse);

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

  // close button clicked, will emit to the parent component to set the flag to false and the form will dissapear
  onCloseClicked() {
    this.onClose.emit();
  }

}
