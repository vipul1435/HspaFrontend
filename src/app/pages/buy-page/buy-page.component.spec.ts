import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPageComponent } from './buy-page.component';

describe('BuyPageComponent', () => {
  let component: BuyPageComponent;
  let fixture: ComponentFixture<BuyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
