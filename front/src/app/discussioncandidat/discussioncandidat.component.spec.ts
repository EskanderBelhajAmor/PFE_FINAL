import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussioncandidatComponent } from './discussioncandidat.component';

describe('DiscussioncandidatComponent', () => {
  let component: DiscussioncandidatComponent;
  let fixture: ComponentFixture<DiscussioncandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscussioncandidatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscussioncandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
