import { Comment } from "../comment/comment";
import { ProjectSimplified } from "../project/projectSimplified";
import { TicketSimplified } from "../ticket/ticketSimplified";

export class DeveloperDetailed {
    id: String;
    firstName: String;
    lastName: String;
    phone: String;
    email: String;
    role: String;
    ticketsCreated: TicketSimplified[];
    projects: ProjectSimplified[];
    comments: Comment[];
}