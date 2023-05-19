import { DeveloperSimplified } from "../developer/developerSimplified";
import { TicketPriority } from "./enums/ticketPriority";
import { TicketStatus } from "./enums/ticketStatus";
import { TypeOfTicket } from "./enums/typeOfTicket";
import { Comment } from "../comment/comment";

export class TicketDetailed {
    id: String;
    title: String;
    description: String;
    dateCreated: Date;
    lastDateModified: Date;
    typeOfTicket: TypeOfTicket;
    ticketPriority: TicketPriority;
    ticketStatus: TicketStatus;
    author: DeveloperSimplified;
    devsAssigned: DeveloperSimplified[];
    project: String;
    comments: Comment[];
}