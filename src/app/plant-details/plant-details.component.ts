import { Component, inject } from "@angular/core";
import { formatDate } from "@angular/common"
import { PlantService } from "../plant.service";
import { PlantItem } from "../plantItem";
import { ActivatedRoute } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-plant-details",
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule],
  templateUrl: "./plant-details.component.html",
  styleUrl: "./plant-details.component.scss",
})
export class PlantDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  plantService = inject(PlantService);
  plantItem: PlantItem | undefined;
  applyForm = new FormGroup({
    plantName: new FormControl(""),
    plantLocation: new FormControl(""),
    plantWaterred: new FormControl(true),
    waterredDate: new FormControl("1900-01-01"),
  });

  constructor() {
    const plantItemId = Number(this.route.snapshot.params["id"]);
    this.plantItem = this.plantService.getPlantItemsById(plantItemId);
    if(this.plantItem === undefined){
    //TODO Error 404 item not found
    }else{
      this.applyForm.patchValue({
      plantName: this.plantItem.name,
      plantLocation: this.plantItem.location,
      plantWaterred: this.plantItem.waterred,
      waterredDate: this.plantItem.waterredDate,
      });
    }
  }
  confirmEdit() {
    if (this.plantItem === undefined) {
    //TODO Error 404 item not found
    } else {
      this.plantService.editPlant(
        this.plantItem.id,
        this.applyForm.value.plantName ?? this.plantItem.name,
        this.applyForm.value.plantLocation ?? this.plantItem.location,
        this.applyForm.value.plantWaterred ?? this.plantItem?.waterred,
        this.applyForm.value.waterredDate ?? this.plantItem?.waterredDate
      );
    }
  }
}
