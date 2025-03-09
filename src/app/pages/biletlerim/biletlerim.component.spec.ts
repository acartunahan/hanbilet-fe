import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiletlerimComponent } from './biletlerim.component';

describe('BiletlerimComponent', () => {
  let component: BiletlerimComponent;
  let fixture: ComponentFixture<BiletlerimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiletlerimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiletlerimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
