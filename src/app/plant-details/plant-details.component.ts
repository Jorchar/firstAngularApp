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
  editPlantForm = new FormGroup({
    plantName: new FormControl(""),
    plantLocation: new FormControl(""),
    plantWatered: new FormControl(true),
    wateredDate: new FormControl("1900-01-01"),
  });

  constructor() {
    this.plantItemId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit(): void{
    this.plantService.getPlantItemById(this.plantItemId)?.subscribe({
      next: (plantItem) => this.plantItem = plantItem,
      error: (e) => console.log(e),
      complete: () => {
        console.log("Plant found");
        this.editPlantForm.patchValue({
          plantName: this.plantItem?.name,
          plantLocation: this.plantItem?.location,
          plantWatered: this.plantItem?.watered,
          wateredDate: this.plantItem?.wateredDate,
        });
    }
    });
  }

  confirmEdit() {
      this.plantService.editPlant({
      id: this.plantItemId,
      name: this.editPlantForm.value.plantName ?? this.plantItem?.name,
      location: this.editPlantForm.value.plantLocation ?? this.plantItem?.location,
      photo: this.plantItem?.photo,
      watered: this.editPlantForm.value.plantWatered ?? this.plantItem?.watered,
      wateredDate: this.editPlantForm.value.wateredDate ?? this.plantItem?.wateredDate
  }).subscribe({
    next:  (v) => console.log("Editing plant in progress"),
    error:  (e) => console.log(e),
    complete: () => console.log("Plant patched")
  })
  }
}
