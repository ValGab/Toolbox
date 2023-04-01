import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrToolboxComponent } from './scr-toolbox.component';

describe('ScrToolboxComponent', () => {
  let component: ScrToolboxComponent;
  let fixture: ComponentFixture<ScrToolboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrToolboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
