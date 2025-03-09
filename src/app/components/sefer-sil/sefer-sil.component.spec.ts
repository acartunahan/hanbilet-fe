import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeferSilComponent } from './sefer-sil.component';

describe('SeferSilComponent', () => {
  let component: SeferSilComponent;
  let fixture: ComponentFixture<SeferSilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeferSilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeferSilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
