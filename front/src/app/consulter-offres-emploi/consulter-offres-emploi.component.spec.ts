import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterOffresEmploiComponent } from './consulter-offres-emploi.component';

describe('ConsulterOffresEmploiComponent', () => {
  let component: ConsulterOffresEmploiComponent;
  let fixture: ComponentFixture<ConsulterOffresEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsulterOffresEmploiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsulterOffresEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
