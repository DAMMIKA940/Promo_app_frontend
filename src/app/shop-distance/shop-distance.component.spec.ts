import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDistanceComponent } from './shop-distance.component';

describe('ShopDistanceComponent', () => {
  let component: ShopDistanceComponent;
  let fixture: ComponentFixture<ShopDistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopDistanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
