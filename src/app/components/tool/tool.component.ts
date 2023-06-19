import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  @Output() delete = new EventEmitter<void>();

  public deleteConfirm: Boolean = false;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private toolsService: ToolsService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onClickDelete() {
    this.deleteConfirm = true;
  }

  onClickEdit(id: string) {
    this.router.navigateByUrl('/tools/modify/' + id);
  }

  deleteConfirmed(id: string) {
    const url = environment.apiUrl + '/tools/delete';
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.post(url, { id }, { headers }).subscribe(() => {
      this.toolsService.getTools().subscribe(() => {
        this.delete.emit();
      });
    });
  }
}
