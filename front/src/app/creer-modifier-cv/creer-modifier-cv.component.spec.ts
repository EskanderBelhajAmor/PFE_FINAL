import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerModifierCVComponent } from './creer-modifier-cv.component';

describe('CreerModifierCVComponent', () => {
  let component: CreerModifierCVComponent;
  let fixture: ComponentFixture<CreerModifierCVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreerModifierCVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreerModifierCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
