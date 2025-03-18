import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedLibraryComponent } from './liked-library.component';

describe('LikedLibraryComponent', () => {
  let component: LikedLibraryComponent;
  let fixture: ComponentFixture<LikedLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikedLibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikedLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
