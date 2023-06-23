import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scr-toolbox',
  templateUrl: './scr-toolbox.component.html',
  styleUrls: ['./scr-toolbox.component.scss'],
})
export class ScrToolboxComponent implements OnInit, OnDestroy {
  public search: string = '';
  public isLoading: boolean = true;

  public data: any;
  public filteredData: any[any] = [];

  public showModal: boolean = false;
  public toolRequest: string = '';

  public isLoadingRequest: boolean = false;
  public antispam: number[] = [];
  public resultAntispam: number = 0;
  public errorAntispam: boolean = false;

  private toolToSubmit: Subscription = new Subscription();

  public message: string = '';

  constructor(
    public toolsService: ToolsService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getTools();
  }

  ngOnDestroy() {
    this.toolToSubmit.unsubscribe();
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

  onClickToolsShared() {
    this.router.navigateByUrl('/tools/shared');
  }

  onClickExit() {
    this.authService.userToDisconnect();
  }

  onClickToolRequest() {
    this.showModal = true;
    this.antispamGenerate();
    this.resultAntispam = 0;
    this.isLoadingRequest = false;
    this.toolRequest = '';
    this.message = '';
  }

  antispamGenerate() {
    for (let i = 0; i < 2; i++) {
      this.antispam.push(Math.floor(Math.random() * 10));
    }
  }

  onClickModal(event: Event) {
    event.stopPropagation();
  }

  onClickCloseModal() {
    this.showModal = false;
    this.toolRequest = '';
    this.antispam.length = 0;
  }

  onClickSubmitTool() {
    this.errorAntispam = false;
    if (this.antispam) {
      let antispamNumber = this.antispam[0] + this.antispam[1];
      if (antispamNumber !== this.resultAntispam) {
        this.errorAntispam = true;
      } else {
        if (this.toolRequest) {
          this.isLoadingRequest = true;
          this.toolToSubmit = this.toolsService
            .submitTool(this.toolRequest.toString())
            .subscribe((result) => {
              if (result) {
                this.message = 'Outil envoyé ! Merci !';
                setTimeout(() => {
                  this.showModal = false;
                }, 3000);
              } else {
                this.message = "Une erreur s'est produite, veuillez réessayer.";
              }
            });
        }
      }
    }
  }
}
