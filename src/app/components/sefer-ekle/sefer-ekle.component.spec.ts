import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeferEkleComponent } from './sefer-ekle.component';

describe('SeferEkleComponent', () => {
  let component: SeferEkleComponent;
  let fixture: ComponentFixture<SeferEkleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeferEkleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeferEkleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
