import { TicketPriority } from "./enums/ticketPriority";
import { TicketStatus } from "./enums/ticketStatus";
import { TypeOfTicket } from "./enums/typeOfTicket";

export class UpdateTicketMultipleFields {
    title: String;
    description: String;
    typeOfTicket: TypeOfTicket;
    ticketPriority: TicketPriority;
    tickteStatus: TicketStatus;
    devsAssigned: String[];
}