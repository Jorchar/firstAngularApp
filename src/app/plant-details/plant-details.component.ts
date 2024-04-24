import { Component, inject } from '@angular/core';
import { PlantService } from '../plant.service';
import { PlantItem } from './plantItem';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-plant-details',
  standalone: true,
  imports: [],
  templateUrl: './plant-details.component.html',
  styleUrl: './plant-details.component.scss'
})
export class PlantDetailsComponent {

route: ActivatedRoute = inject(ActivatedRoute);
plantService = inject(PlantService);
plantItem: PlantItem | undefined;

constructor(){
  const plantItemId = Number(this.route.snapshot.params['id']);
  this.plantItem = this.plantService.getPlantItemsById(plantItemId);
}
}