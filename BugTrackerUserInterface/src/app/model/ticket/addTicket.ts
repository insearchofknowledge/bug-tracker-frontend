import { TicketPriority } from "./enums/ticketPriority";
import { TicketStatus } from "./enums/ticketStatus";
import { TypeOfTicket } from "./enums/typeOfTicket";

export class AddTicket {
    title: String;
    description: String;
    dateCreated: Date;
    lastDateModified: Date;
    typeOfTicket: TypeOfTicket;
    ticketPriority: TicketPriority;
    ticketStatus: TicketStatus;
    author: String;
    devsAssigned: String[];
    project: String;
}