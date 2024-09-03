import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PlantDetailsComponent } from "./plant-details/plant-details.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {PlantAddComponent} from "./plant-add/plant-add.component";
import {inject} from "@angular/core";
import {PlantService} from "./plant.service";
import {catchError, of} from "rxjs";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "Home",
  },
  {
    path: "plant-details/:id",
    component: PlantDetailsComponent,
    title: "Plant Details",
  },
  {
    path: "calendar",
    component: CalendarComponent,
    title: "Calendar",
    resolve: {
      'plantItemsList': () => inject(PlantService).getAllPlantItemsWithoutPhoto().pipe(
        catchError(() => {
          return of(null);
          }
        )
      )
    }
  },
  {
    path: "plant-add",
    component: PlantAddComponent,
    title: "Plant Add",
  },
];
