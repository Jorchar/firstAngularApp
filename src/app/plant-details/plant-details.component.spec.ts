import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantDetailsComponent } from './plant-details.component';
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PlantDetailsComponent', () => {
  let component: PlantDetailsComponent;
  let fixture: ComponentFixture<PlantDetailsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PlantDetailsComponent,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ]
    })
    .compileComponents();
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(PlantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
