import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtobusDropdownComponent } from './otobus-dropdown.component';

describe('OtobusDropdownComponent', () => {
  let component: OtobusDropdownComponent;
  let fixture: ComponentFixture<OtobusDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtobusDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtobusDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
