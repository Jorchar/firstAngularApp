import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantItemComponent } from '../plant-item/plant-item.component';
import { PlantItem } from '../plantItem';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PlantItemComponent, CommonModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
plantItemList: PlantItem[] = [
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
}
