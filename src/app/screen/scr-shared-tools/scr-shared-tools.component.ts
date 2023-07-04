import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-scr-shared-tools',
  templateUrl: './scr-shared-tools.component.html',
  styleUrls: ['./scr-shared-tools.component.scss'],
})
export class ScrSharedToolsComponent implements OnInit {
  public isLoading: boolean = true;
  public data: any;

  constructor(private toolsService: ToolsService, private router: Router) {}

  ngOnInit(): void {
    this.getToolsShared();
  }

  private getToolsShared() {
    this.toolsService.getToolsShared().subscribe((data) => {
      this.data = data;
      this.isLoading = false;
    });
  }

  public transformDate(date: Date) {
    let transformDate = new Date(date);
    return `${transformDate.getDate()}/${
      transformDate.getMonth() + 1
    }/${transformDate.getFullYear()}`;
  }

  onClickHome() {
    this.router.navigateByUrl('/');
  }
}
