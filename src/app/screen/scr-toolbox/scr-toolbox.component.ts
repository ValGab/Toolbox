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
  public isLoading: Boolean = false;

  constructor(
    public toolsService: ToolsService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.toolsService.fetchData().subscribe((data) => {
      this.toolsService.data = data;
      this.toolsService.filteredData = data;
      this.isLoading = false;
    });
  }

  filterData() {
    this.toolsService.filterData(this.search);
  }

  onClickAdd() {
    this.router.navigateByUrl('/tools/add');
  }
}
