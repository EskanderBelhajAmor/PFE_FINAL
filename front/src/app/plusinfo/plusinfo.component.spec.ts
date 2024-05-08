import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusinfoComponent } from './plusinfo.component';

describe('PlusinfoComponent', () => {
  let component: PlusinfoComponent;
  let fixture: ComponentFixture<PlusinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlusinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlusinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
