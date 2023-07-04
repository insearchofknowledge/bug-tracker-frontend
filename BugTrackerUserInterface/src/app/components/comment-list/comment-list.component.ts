import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { AddComment } from 'src/app/model/comment/addComment';
import { Comment } from 'src/app/model/comment/comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnChanges {

  // it takes data from components we include this one in
  @Input() comments: Comment[];
  @Input() ticketId: String;

  commentContent: String;
  sortedComments: Comment[];

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.sortCommentsByDatePosted();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['comments'] && this.comments) {
      this.sortCommentsByDatePosted();
    }
  }

  private sortCommentsByDatePosted(): void {
    this.sortedComments = this.comments.sort((a, b) => {
      const dateA = new Date(a.datePosted).getTime();
      const dateB = new Date(b.datePosted).getTime();
      return dateB - dateA;
    });
  }

  onSubmit() {
    console.log("Onsubmit for adding comment called....")
    if (this.commentContent) {
      console.log("commentContent is true");
      const newComment: AddComment = new AddComment();
      newComment.content = this.commentContent;
      newComment.ticket = this.ticketId;
      this.commentService.addComment(newComment).subscribe({
        next: responese => {
          this.commentContent = '';
          this.comments.push(responese);
        }  
      })
    }
  }
}
