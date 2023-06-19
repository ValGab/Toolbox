import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ToolsService } from 'src/app/services/tools.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scr-modify-tool',
  templateUrl: './scr-modify-tool.component.html',
  styleUrls: ['./scr-modify-tool.component.scss'],
})
export class ScrModifyToolComponent implements OnInit {
  public isLoading: boolean = true;

  public tool: any;

  toolForm!: FormGroup;
  toolPreview$!: Observable<any>;
  arrayLabels!: string[];
  errorMessage?: string = '';

  constructor(
    private route: ActivatedRoute,
    private toolsService: ToolsService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      // On récupère les paramètres avec paramMap
      const id = params.get('id');
      this.getTool(id);
    });

    this.toolForm = this.formBuilder.group({
      title: [null],
      description: [null],
      url: [null],
      labels: [null],
    });
  }

  private getTool(id: any) {
    // Requête pour trouver le tool ciblé
    this.toolsService.getTool(id).subscribe((data) => {
      this.tool = data;

      this.toolForm.get('title')?.setValue(this.tool.title);
      this.toolForm.get('description')?.setValue(this.tool.description);
      this.toolForm.get('url')?.setValue(this.tool.url);
      this.arrayLabels = this.tool.labels;

      this.isLoading = false;
    });
  }

  onClickHome() {
    this.router.navigateByUrl('/');
  }

  getLabelsArray() {
    if (
      this.toolForm.value.labels.length > 1 &&
      this.toolForm.value.labels[0] !== ',' &&
      this.toolForm.value.labels[0] !== ' '
    ) {
      for (let i = 0; i < this.toolForm.value.labels.length; i++) {
        if (
          this.toolForm.value.labels[i] === ',' ||
          this.toolForm.value.labels[i] === ' '
        ) {
          this.arrayLabels.push(
            this.toolForm.value.labels.slice(0, i).toLowerCase()
          );
          this.toolForm.get('labels')?.setValue('');
        }
      }
    }
  }

  getLabelsArrayEnter() {
    if (this.toolForm.value.labels) {
      this.arrayLabels.push(this.toolForm.value.labels.toLowerCase());
      this.toolForm.get('labels')?.setValue('');
    }
  }

  deleteLabel(label: string) {
    let index = this.arrayLabels.indexOf(label);
    this.arrayLabels.splice(index, 1);
  }

  onSubmitForm() {
    this.errorMessage = '';
    const url = environment.apiUrl + '/tools/modify';
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    if (
      this.toolForm.value.title &&
      this.toolForm.value.description &&
      this.toolForm.value.url &&
      this.arrayLabels.length
    ) {
      const body = {
        id: this.tool._id,
        title: this.toolForm.value.title,
        description: this.toolForm.value.description,
        url: this.toolForm.value.url,
        labels: this.arrayLabels,
      };

      this.http.post(url, body, { headers }).subscribe({
        next: (response) => {
          if (response) {
            this.router.navigateByUrl('/');
          }
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
    }
  }
}
