import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scr-add-tool',
  templateUrl: './scr-add-tool.component.html',
  styleUrls: ['./scr-add-tool.component.scss'],
})
export class ScrAddToolComponent implements OnInit {
  toolForm!: FormGroup;
  toolPreview$!: Observable<any>;
  arrayLabels!: string[];
  errorMessage?: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.toolForm = this.formBuilder.group({
      title: [null],
      description: [null],
      url: [null],
      labels: [null],
    });
    this.toolPreview$ = this.toolForm.valueChanges;

    this.arrayLabels = [];
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
          this.toolForm.value.labels = '';
        }
      }
    }
  }

  getLabelsArrayEnter() {
    if (this.toolForm.value.labels) {
      this.arrayLabels.push(this.toolForm.value.labels.toLowerCase());
      this.toolForm.value.labels = '';
    }
  }

  deleteLabel(label: string) {
    let index = this.arrayLabels.indexOf(label);
    this.arrayLabels.splice(index, 1);
  }

  onSubmitForm() {
    this.errorMessage = '';
    const url = environment.apiUrl + '/tools/add';
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
        title: this.toolForm.value.title,
        description: this.toolForm.value.description,
        url: this.toolForm.value.url,
        labels: this.arrayLabels,
      };

      this.http.post(url, body, { headers }).subscribe(
        (response) => {
          if (response) {
            this.router.navigateByUrl('/');
          }
        },
        (error) => {
          if (error.status === 409) {
            this.errorMessage = error.message;
          }
        }
      );
    }
  }
}
