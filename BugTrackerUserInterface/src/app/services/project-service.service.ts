import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectSimplified } from '../model/project/projectSimplified';
import { ProjectDetailed } from '../model/project/projectDetailed';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  public fetchProjectById(projectId: String): Observable<ProjectDetailed> {
    return this.httpClient.get<ProjectDetailed>(`${this.apiServerUrl}/api/projects/${projectId}`);
  }

  public fetchAllProjects(): Observable<ProjectSimplified[]> {
    return this.httpClient.get<ProjectSimplified[]>(`${this.apiServerUrl}/api/projects/all`);
  }

  public fetchAllMyProjects(developerId: String): Observable<ProjectSimplified[]> {
    return this.httpClient.get<ProjectSimplified[]>(`${this.apiServerUrl}/api/projects/myProjects/${developerId}`);
  }

}
