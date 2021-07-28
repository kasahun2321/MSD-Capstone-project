import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowitemsComponent } from './showitems.component';

describe('ShowitemsComponent', () => {
  let component: ShowitemsComponent;
  let fixture: ComponentFixture<ShowitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowitemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
