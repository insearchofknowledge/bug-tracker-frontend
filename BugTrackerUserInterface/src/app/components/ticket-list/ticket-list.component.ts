import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeveloperSimplified } from 'src/app/model/developer/developerSimplified';
import { TicketSimplified } from 'src/app/model/ticket/ticketSimplified';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  // it takes data from components we include this one in
  @Input() tickets: TicketSimplified[];
  @Input() listName: String = "Tickets";
  @Input() public displayAddButton: boolean = false;

  // these inputs come from ProjectDetailComponent (parent) and will be passed on to CreateTicketComponent
  @Input() projectId: String;
  @Input() projectTeam: DeveloperSimplified[];

  public context: String;
  showPopup: boolean = false;

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ticketClicked(ticket: TicketSimplified) {
    console.log("ticketClicked() called....");
    this.context = this.sharedService.getContextForTicketList();
    console.log("the context is: " + this.context);
      // contextForTicketList can be: "projectDetail" or "myTicketList"
      // we are checking if a ticket is clicked from the ticket list as a child component of my-ticket-list or project-detail
      // if the ticket is chosen from the ticket list being within the project-detail
      if (this.context == "projectDetail") {
        // we simply set the selectedTicketId and since a change occurs to the selectedTIcketId 
        // a new subscription will occur in the ticket-dtail.component and the details of the selected ticket will be displayed
        this.sharedService.setSelectedTicketId(ticket.id);
      } // if the ticket is chosen from the ticket list being within the my-ticket-list.component 
      else if (this.context == "myTicketList") {
        // we store the id of the ticket in the sharedService as another field
        this.sharedService.setInitialTicketId(ticket.id); // we will check if this exists in the ticket-detail.component
        // we navigate to project-detail.component where 
        // the details of the project this ticket is part of will be loaded 
        // and the selected ticket will be loaded
        // into the ticket-detail.component which is included in the project-detail.component
        this.router.navigate(['/projectDetails', ticket.project]);
      }
    };

    // Will help make the createTicketForm appear / dissapear
    togglePopup() {
      this.showPopup = !this.showPopup;
    }

    // This will take the @Output event of ticketSimplified from the addTicketForm component and add it to the ticket list
    onTicketAdded(newTicket: TicketSimplified) {
      this.tickets.push(newTicket);
    }
}
