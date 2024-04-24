import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlantItemComponent } from "../plant-item/plant-item.component";
import { PlantItem } from "../plantItem";
import { MatButtonModule } from "@angular/material/button";
import { PlantService } from "../plant.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [PlantItemComponent, CommonModule, MatButtonModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  plantItemList: PlantItem[] = [];
  plantService: PlantService = inject(PlantService);

  constructor() {
    this.plantItemList = this.plantService.getAllPlantItems();
  }
}
