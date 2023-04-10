import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrAddToolComponent } from './scr-add-tool.component';

describe('ScrAddToolComponent', () => {
  let component: ScrAddToolComponent;
  let fixture: ComponentFixture<ScrAddToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrAddToolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrAddToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
