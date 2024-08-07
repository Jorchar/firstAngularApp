import {Component, inject} from '@angular/core';
import {DragAndDropDirective} from "../drag-and-drop.directive";
import {NgIf} from "@angular/common";
import {GlobalErrorHandlerService} from "../global-error-handler.service";
import {DragAndDropComponent} from "../drag-and-drop/drag-and-drop.component";
import {PlantService} from "../plant.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-plant-add',
  standalone: true,
  imports: [
    DragAndDropDirective,
    NgIf,
    DragAndDropComponent,
    ReactiveFormsModule
  ],
  templateUrl: './plant-add.component.html',
  styleUrl: './plant-add.component.scss'
})
export class PlantAddComponent {
  plantService = inject(PlantService);
  globalErrorHandler: GlobalErrorHandlerService = inject(GlobalErrorHandlerService);
  image: any;
  addPlantForm = new FormGroup({
    plantName: new FormControl(""),
    plantLocation: new FormControl(""),
    daysBetweenHydrate: new FormControl(0),
    waterredDate: new FormControl("1900-01-01")
  });

  prepareImage(files: FileList) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.image = reader.result as string;
    };
    reader.onerror = () => {
      this.globalErrorHandler.errorHandle("Could not load image");
    }
  }

  confirmAdd() {
    this.plantService.addPlant({
      name: this.addPlantForm.value.plantName,
      location: this.addPlantForm.value.plantLocation,
      photo: this.image,
      wateredDate: this.addPlantForm.value.waterredDate,
      daysBetweenHydrate: this.addPlantForm.value.daysBetweenHydrate,
    }).subscribe({
      next: () => console.log("Creating plant in progress"),
      error: () => console.log("Could not create plant"),
      complete: () => console.log("Plant added")
    })
  }
}
