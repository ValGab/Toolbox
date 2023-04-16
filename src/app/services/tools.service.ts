import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor(private http: HttpClient) {}

  public data: any;
  public filteredData: any[any] = [];

  fetchData() {
    return this.http.get(environment.apiUrl);
  }

  filterData(search: string) {
    if (!this.data) {
      return;
    }
    if (!this.filteredData || search === '') {
      this.filteredData = this.data;
    }

    let searchSplit: string[] = this.strNoAccent(search).split(' ');

    let newData: any = this.data;
    let array = [];

    for (let h = 0; h < searchSplit.length; h++) {
      if (searchSplit[h] !== '' && searchSplit[h].length > 1) {
        for (let i = 0; i < newData.length; i++) {
          if (
            this.strNoAccent(newData[i].title)
              .toLowerCase()
              .includes(searchSplit[h].toLowerCase())
          ) {
            if (array.indexOf(newData[i]) === -1) {
              array.push(newData[i]);
            }
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

  private strNoAccent(value: string) {
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
