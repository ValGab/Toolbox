import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-scr-add-tool',
  templateUrl: './scr-add-tool.component.html',
  styleUrls: ['./scr-add-tool.component.scss'],
})
export class ScrAddToolComponent implements OnInit {
  toolForm!: FormGroup;
  toolPreview$!: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.toolForm = this.formBuilder.group({
      title: [null],
      description: [null],
      url: [null],
      labels: [null],
    });
    this.toolPreview$ = this.toolForm.valueChanges;
  }

  onSubmitForm() {
    const url = 'http://localhost:3000/tools/add';
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const body = {
      title: this.toolForm.value.title,
      description: this.toolForm.value.description,
      url: this.toolForm.value.url,
      labels: this.toolForm.value.labels.split(','),
    };

    this.http.post(url, body, { headers }).subscribe((response) => {
      console.log('API Response:', response);
    });
  }
}
