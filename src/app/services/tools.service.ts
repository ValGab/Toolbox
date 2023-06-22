import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor(private http: HttpClient) {}

  getTools() {
    return this.http.get(environment.apiUrl);
  }

  getTool(id: string) {
    return this.http.get(environment.apiUrl + '/tools/modify/' + id);
  }

  submitTool(tool: string) {
    return this.http.post(environment.apiUrl + '/submit', {
      tool,
    });
  }
}
