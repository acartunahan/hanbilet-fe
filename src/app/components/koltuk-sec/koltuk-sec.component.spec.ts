import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoltukSecComponent } from './koltuk-sec.component';

describe('KoltukSecComponent', () => {
  let component: KoltukSecComponent;
  let fixture: ComponentFixture<KoltukSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KoltukSecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KoltukSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
