import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererEntretiensComponent } from './gerer-entretiens.component';

describe('GererEntretiensComponent', () => {
  let component: GererEntretiensComponent;
  let fixture: ComponentFixture<GererEntretiensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GererEntretiensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GererEntretiensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
