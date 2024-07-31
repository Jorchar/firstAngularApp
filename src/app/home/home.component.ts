import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlantItemComponent } from "../plant-item/plant-item.component";
import { PlantItem } from "../plantItem";
import { PlantService } from "../plant.service";
import {LoadingService} from "../loading.service";
import {GlobalErrorHandlerService} from "../global-error-handler.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [PlantItemComponent, CommonModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  plantItemList: PlantItem[] = [];
  plantService: PlantService = inject(PlantService);
  globalErrorHandler: GlobalErrorHandlerService = inject(GlobalErrorHandlerService);

  constructor( private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.loadingOn();
    this.plantService.getAllPlantItems().subscribe({
      next: (plantItemList) => this.plantItemList = plantItemList,
      error: (e) => {
        this.loadingService.loadingOff();
        this.globalErrorHandler.errorHandle('Could not fetch plants', e);
      },
      complete: () => {
        console.log("Plants fetched");
        this.loadingService.loadingOff();
      }
    });
  }
}
