import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-scr-toolbox',
  templateUrl: './scr-toolbox.component.html',
  styleUrls: ['./scr-toolbox.component.scss'],
})
export class ScrToolboxComponent implements OnInit {
  public search: string = '';

  constructor(public toolsService: ToolsService) {}

  ngOnInit() {
    this.toolsService.fetchData();
  }

  filterData() {
    this.toolsService.filterData(this.search);
  }
}
