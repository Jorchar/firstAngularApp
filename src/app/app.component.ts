import { Component } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { RouterModule } from "@angular/router";
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HomeComponent, RouterModule, MatIconModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "WateringPlantApp";
}
