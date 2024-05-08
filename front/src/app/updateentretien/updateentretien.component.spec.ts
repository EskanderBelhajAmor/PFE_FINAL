import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateentretienComponent } from './updateentretien.component';

describe('UpdateentretienComponent', () => {
  let component: UpdateentretienComponent;
  let fixture: ComponentFixture<UpdateentretienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateentretienComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateentretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
