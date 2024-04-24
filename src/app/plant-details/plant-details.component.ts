import { Component, inject } from '@angular/core';
import { PlantService } from '../plant.service';
import { PlantItem } from './plantItem';

@Component({
  selector: 'app-plant-details',
  standalone: true,
  imports: [],
  templateUrl: './plant-details.component.html',
  styleUrl: './plant-details.component.scss'
})
export class PlantDetailsComponent {
plantService = inject(PlantService);
plantItem: PlantItem | undefined;
}

constructor() {
const plantItemId = 1;
this.plantItem = this.PlantService.getPlantItemsById(plantItemId);
}
