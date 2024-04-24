import { Injectable } from '@angular/core';
import { PlantItem } from './plantItem';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
protected plantItemList: PlantItem[] = [
{
"id":1,
"name": "Yuka",
"location": "Salon",
"photo": "/assets/plant.svg",
"waterred": true,
"waterredDate": 10
},
{
"id":2,
"name": "Orchidea",
"location": "Kuchnia",
"photo": "/assets/plant.svg",
"waterred": false,
"waterredDate": 1
},
{
"id":3,
"name": "Cactus",
"location": "Salon",
"photo": "/assets/plant.svg",
"waterred": true,
"waterredDate": 12
},
{
"id":4,
"name": "Monstera",
"location": "Salon",
"photo": "/assets/plant.svg",
"waterred": true,
"waterredDate": 15
},
{
"id":5,
"name": "Sukulent",
"location": "Kuchnia",
"photo": "/assets/plant.svg",
"waterred": false,
"waterredDate": 10
}
];
  constructor() { }

  getAllPlantItems() : PlantItem[] {
  return this.plantItemList;
  }

  getPlantItemsById(id: Number): PlantItem |
  undefined {
  return this.plantItemList.find(plantItem => plantItem.id === id);
  }
}
