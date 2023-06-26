import { TicketPriority } from "./enums/ticketPriority";
import { TicketStatus } from "./enums/ticketStatus";
import { TypeOfTicket } from "./enums/typeOfTicket";

export class AddTicket {
    title: String;
    description: String;
    typeOfTicket: TypeOfTicket;
    ticketPriority: TicketPriority;
    ticketStatus: TicketStatus;
    devsAssigned: String[];
    project: String;
}