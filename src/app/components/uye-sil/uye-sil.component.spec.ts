import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UyeSilComponent } from './uye-sil.component';

describe('UyeSilComponent', () => {
  let component: UyeSilComponent;
  let fixture: ComponentFixture<UyeSilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UyeSilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UyeSilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
