import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scr-toolbox',
  templateUrl: './scr-toolbox.component.html',
  styleUrls: ['./scr-toolbox.component.scss'],
})
export class ScrToolboxComponent implements OnInit {
  public data: any;
  public filteredData: any;
  public search: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000').subscribe((data) => {
      this.data = data;
      this.filteredData = data;
    });
  }

  filterData() {
    if (!this.data) {
      return;
    }
    let newData: any = this.data;
    let array = [];
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].title.toLowerCase().includes(this.search.toLowerCase())) {
        array.push(newData[i]);
      }
    }
    this.filteredData = array;
  }
}
