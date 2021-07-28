import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintrecieptComponent } from './printreciept.component';

describe('PrintrecieptComponent', () => {
  let component: PrintrecieptComponent;
  let fixture: ComponentFixture<PrintrecieptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintrecieptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintrecieptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
