import { Component, inject, OnInit } from "@angular/core";
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
export class PlantDetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  plantService = inject(PlantService);
  plantItem: PlantItem | undefined;
  plantItemId: number;
  applyForm = new FormGroup({
    plantName: new FormControl(""),
    plantLocation: new FormControl(""),
    plantWaterred: new FormControl(true),
    waterredDate: new FormControl("1900-01-01"),
  });

  constructor() {
    this.plantItemId = Number(this.route.snapshot.params['id']);
    this.plantItem = undefined;
  }

  ngOnInit(): void{
    this.plantService.getPlantItemById(this.plantItemId)?.subscribe(plantItem=>(this.plantItem = plantItem));
  }

  confirmEdit() {
      this.plantService.editPlant({
      id: this.plantItemId,
      name: this.applyForm.value.plantName ?? '',
      location: this.applyForm.value.plantLocation ?? '',
      photo: "/assets/plant.svg",
      waterred: this.applyForm.value.plantWaterred ?? false,
      waterredDate: this.applyForm.value.waterredDate ?? '2024-04-22'
  }).subscribe(
    (response) => console.log(response),
    (error: any) => console.log(error),
    () => console.log("Plant patched")
  )
  }
}
