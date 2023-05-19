import { DeveloperSimplified } from "../developer/developerSimplified";

export class Comment {
    id: String;
    content: String;
    datePosted: Date;
    wasEdited: Boolean;
    commentAuthor: DeveloperSimplified;
}