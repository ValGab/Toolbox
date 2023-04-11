import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from 'src/app/services/tools.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss'],
})
export class ToolComponent implements OnInit {
  @Input() tool?: any;

  public deleteConfirm: Boolean = false;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private toolsService: ToolsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  onClickDelete() {
    this.deleteConfirm = true;
  }

  deleteConfirmed(id: string) {
    const url = environment.apiUrl + '/tools/delete';
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.post(url, { id }, { headers }).subscribe(() => {
      this.toolsService.fetchData().subscribe((data) => {
        this.toolsService.data = data;
        this.toolsService.filteredData = data;
      });
    });
  }
}
