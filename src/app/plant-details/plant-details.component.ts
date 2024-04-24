import { Component, inject } from '@angular/core';
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
plantItemId = 0;

constructor(){
this.plantItemId = Number(this.route.snapshot.params['id'])
}
}
