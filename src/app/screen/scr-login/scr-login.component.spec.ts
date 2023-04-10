import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrLoginComponent } from './scr-login.component';

describe('ScrLoginComponent', () => {
  let component: ScrLoginComponent;
  let fixture: ComponentFixture<ScrLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
