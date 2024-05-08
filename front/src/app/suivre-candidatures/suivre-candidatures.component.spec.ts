import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivreCandidaturesComponent } from './suivre-candidatures.component';

describe('SuivreCandidaturesComponent', () => {
  let component: SuivreCandidaturesComponent;
  let fixture: ComponentFixture<SuivreCandidaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuivreCandidaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuivreCandidaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
