import { DeveloperSimplified } from "../developer/developerSimplified";

export class TicketSimplified {
    id: String;
    title: String;
    description: String;
    dateCreated: Date;
    author: DeveloperSimplified;
    project: String;
    // Ticket status ??!?!?!
}