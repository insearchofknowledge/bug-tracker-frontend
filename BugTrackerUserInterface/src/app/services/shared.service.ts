import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // we need this to check if the ticket was selected from the my-ticket-list.component
  // and will check for this in the ticket-detail.component and load the ticket with this ID
  private initialTicketId: String;

  private selectedTicketId = new Subject<String>();
  private selectedProjectId = new Subject<String>();
  private contextForTicketList: String;


  constructor() { }
  
  setSelectedTicketId(id: String) {
    console.log("setSelectedTicketId() service method called.....");
    this.selectedTicketId.next(id);
  }

  getSelectedTicketId() {
    console.log("getSelectedTicketId() service method called...")
    return this.selectedTicketId.asObservable();
  }

  setSelectedProjectId(id: String) {
    this.selectedProjectId.next(id);
  }

  getSelectedProjectId() {
    return this.selectedProjectId;
  }

  setContextForTicketList(context: String) {
    this.contextForTicketList = context;
  }

  getContextForTicketList() {
    return this.contextForTicketList;
  }

  setInitialTicketId(initialId: String) {
    this.initialTicketId = initialId;
  }

  public getInitialTicketId() {
    return this.initialTicketId;
  }
}
