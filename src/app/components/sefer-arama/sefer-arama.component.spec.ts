import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeferAramaComponent } from './sefer-arama.component';

describe('SeferAramaComponent', () => {
  let component: SeferAramaComponent;
  let fixture: ComponentFixture<SeferAramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeferAramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeferAramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
