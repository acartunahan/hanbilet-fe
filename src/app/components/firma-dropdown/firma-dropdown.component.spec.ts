import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaDropdownComponent } from './firma-dropdown.component';

describe('FirmaDropdownComponent', () => {
  let component: FirmaDropdownComponent;
  let fixture: ComponentFixture<FirmaDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirmaDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmaDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
