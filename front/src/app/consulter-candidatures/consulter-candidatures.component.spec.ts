import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterCandidaturesComponent } from './consulter-candidatures.component';

describe('ConsulterCandidaturesComponent', () => {
  let component: ConsulterCandidaturesComponent;
  let fixture: ComponentFixture<ConsulterCandidaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsulterCandidaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsulterCandidaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
