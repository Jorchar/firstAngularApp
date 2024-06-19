import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlantItemComponent} from './plant-item.component';
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('PlantItemComponent', () => {
  let component: PlantItemComponent;
  let fixture: ComponentFixture<PlantItemComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PlantItemComponent,
        RouterTestingModule.withRoutes([])
      ]
    })
    .compileComponents();
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(PlantItemComponent);
    component = fixture.componentInstance;
    component.plantItem = {
      id: 1,
      name: "yuka",
      location: "kitchen",
      photo: "/assets/plant.jpg",
      watered: true,
      wateredDate: "2021-01-16",
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
