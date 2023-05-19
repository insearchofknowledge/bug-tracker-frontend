import { DeveloperSimplified } from "../developer/developerSimplified";
import { TicketSimplified } from "../ticket/ticketSimplified";

export class ProjectDetailed {
    id: String;
    name: String;
    description: String;
    startDate: Date;
    deadline: Date;
    tickets: TicketSimplified[];
    assignedTeam: DeveloperSimplified[];
}