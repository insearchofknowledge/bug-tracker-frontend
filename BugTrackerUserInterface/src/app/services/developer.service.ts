import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeveloperDetailed } from '../model/developer/developerDetailed';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  fetchDeveloperById(): Observable<DeveloperDetailed> {
    return this.httpClient.get<DeveloperDetailed>(`${this.apiServerUrl}/api/developers/profile`);
  }
}
