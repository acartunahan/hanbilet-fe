import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SehirDropdownComponent } from './sehir-dropdown.component';

describe('SehirDropdownComponent', () => {
  let component: SehirDropdownComponent;
  let fixture: ComponentFixture<SehirDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SehirDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SehirDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
