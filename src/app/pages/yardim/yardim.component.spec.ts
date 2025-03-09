import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YardimComponent } from './yardim.component';

describe('YardimComponent', () => {
  let component: YardimComponent;
  let fixture: ComponentFixture<YardimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YardimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YardimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
