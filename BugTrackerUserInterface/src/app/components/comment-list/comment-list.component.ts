import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/model/comment/comment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  // it takes data from components we include this one in
  @Input() comments: Comment[];

  constructor() { }

  ngOnInit(): void {
  }

}
