import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrModifyToolComponent } from './scr-modify-tool.component';

describe('ScrModifyToolComponent', () => {
  let component: ScrModifyToolComponent;
  let fixture: ComponentFixture<ScrModifyToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrModifyToolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrModifyToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
