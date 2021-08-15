import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuiComponent } from './pui.component';

describe('PuiComponent', () => {
  let component: PuiComponent;
  let fixture: ComponentFixture<PuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
