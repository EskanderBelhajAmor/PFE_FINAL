import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterOffresComponent } from './ajouter-offres.component';

describe('AjouterOffresComponent', () => {
  let component: AjouterOffresComponent;
  let fixture: ComponentFixture<AjouterOffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterOffresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
