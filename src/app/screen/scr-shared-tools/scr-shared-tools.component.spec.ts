import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrSharedToolsComponent } from './scr-shared-tools.component';

describe('ScrSharedToolsComponent', () => {
  let component: ScrSharedToolsComponent;
  let fixture: ComponentFixture<ScrSharedToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrSharedToolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrSharedToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
