import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scr-toolbox',
  templateUrl: './scr-toolbox.component.html',
  styleUrls: ['./scr-toolbox.component.scss'],
})
export class ScrToolboxComponent implements OnInit {
  public search: string = '';
  public isLoading: boolean = true;

  public data: any;
  public filteredData: any[any] = [];

  constructor(
    public toolsService: ToolsService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getTools();
  }

  private getTools() {
    this.toolsService.getTools().subscribe((data) => {
      this.data = data;
      this.filteredData = data;
      this.isLoading = false;
    });
  }

  public refreshTools() {
    this.getTools();
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

  onClickAdd() {
    this.router.navigateByUrl('/tools/add');
  }

  onClickExit() {
    this.authService.userToDisconnect();
  }
}
