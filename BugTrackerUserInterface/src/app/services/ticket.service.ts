import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TicketDetailed } from '../model/ticket/ticketDetailed';
import { Observable } from 'rxjs';
import { TicketSimplified } from '../model/ticket/ticketSimplified';
import { AddTicket } from '../model/ticket/addTicket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  public addTicket(addTicket: AddTicket): Observable<TicketDetailed> {
    return this.httpClient.post<TicketDetailed>(`${this.apiServerUrl}/api/tickets/add`, addTicket)
  }

  public fetchTicketById(ticketId: String): Observable<TicketDetailed> {
    return this.httpClient.get<TicketDetailed>(`${this.apiServerUrl}/api/tickets/${ticketId}`);
  }

  public fetchTicketsByDeveloperId(developerId: String): Observable<TicketSimplified[]> {
    return this.httpClient.get<TicketSimplified[]>(`${this.apiServerUrl}/api/tickets/author/${developerId}`);
  }

  public fetchTicketsAssignedToDev(developerId :String): Observable<TicketSimplified[]> {
    return this.httpClient.get<TicketSimplified[]>(`${this.apiServerUrl}/api/tickets/assignedTo/${developerId}`);
  }
}
