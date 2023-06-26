import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddComment } from '../model/comment/addComment';
import { Comment } from '../model/comment/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  public addComment(addComment: AddComment): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.apiServerUrl}/api/comments/add`, addComment);
  }
}
