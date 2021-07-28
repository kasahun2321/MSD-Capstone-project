import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfromMicrocheckformComponent } from './confrom-microcheckform.component';

describe('ConfromMicrocheckformComponent', () => {
  let component: ConfromMicrocheckformComponent;
  let fixture: ComponentFixture<ConfromMicrocheckformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfromMicrocheckformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfromMicrocheckformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
