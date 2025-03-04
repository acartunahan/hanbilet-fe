import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiletSatinAlComponent } from './bilet-satin-al.component';

describe('BiletSatinAlComponent', () => {
  let component: BiletSatinAlComponent;
  let fixture: ComponentFixture<BiletSatinAlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiletSatinAlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiletSatinAlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
