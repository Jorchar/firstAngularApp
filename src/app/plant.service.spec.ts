import {PlantService} from "./plant.service";
import {TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {PlantItem} from "./plantItem";
import {asyncScheduler, scheduled} from "rxjs";

describe('PlantService', () => {
  let service: PlantService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({providers: [PlantService, { provide: HttpClient, useValue: spy }]});
    service = TestBed.inject(PlantService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getPlantItemById should return PlantItem object', (done: DoneFn) => {
    const expectedPlant: PlantItem = {
      id: 0,
      location: "",
      name: "",
      photo: "",
      watered: false,
      wateredDate: ""
    };

    httpClientSpy.get.and.returnValue(scheduled([expectedPlant], asyncScheduler));

    // @ts-ignore
    service.getPlantItemById(expectedPlant.id).subscribe({
      next: (plant) => {
        expect(plant.id).toBe(expectedPlant.id);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});
