import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scr-toolbox',
  templateUrl: './scr-toolbox.component.html',
  styleUrls: ['./scr-toolbox.component.scss'],
})
export class ScrToolboxComponent implements OnInit {
  public data: any;
  public filteredData: any[any] = [];
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
    if (!this.filteredData || this.search === '') {
      this.filteredData = this.data;
    }

    let searchSplit: string[] = this.strNoAccent(this.search).split(' ');

    let newData: any = this.data;
    let array = [];

    for (let h = 0; h < searchSplit.length; h++) {
      if (searchSplit[h] !== '') {
        for (let i = 0; i < newData.length; i++) {
          if (
            this.strNoAccent(newData[i].title)
              .toLowerCase()
              .includes(searchSplit[h].toLowerCase())
          ) {
            array.push(newData[i]);
          } else {
            for (let j = 0; j < newData[i].labels.length; j++) {
              if (
                this.strNoAccent(newData[i].labels[j])
                  .toLowerCase()
                  .includes(searchSplit[h].toLowerCase())
              ) {
                if (array.indexOf(newData[i]) === -1) {
                  array.push(newData[i]);
                }
              }
            }
          }
        }
        this.filteredData = array;
      }
    }
  }

  strNoAccent(value: string) {
    let a = 'áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ';
    let b = 'aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY';
    let newStr = '';
    for (var i = 0, j = value.length; i < j; i++) {
      var c = value.charAt(i);
      newStr += a.indexOf(c) !== -1 ? b.charAt(a.indexOf(c)) : c;
    }
    return newStr;
  }
}
