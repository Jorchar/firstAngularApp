import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantItemComponent } from './plant-item.component';

describe('PlantItemComponent', () => {
  let component: PlantItemComponent;
  let fixture: ComponentFixture<PlantItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
