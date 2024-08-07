import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlantItem } from "../plantItem";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-plant-item",
  imports: [CommonModule, RouterModule, MatButtonModule],
  standalone: true,
  templateUrl: "./plant-item.component.html",
  styleUrl: "./plant-item.component.scss",
})
export class PlantItemComponent {
  @Input() plantItem!: PlantItem;

  constructor() {
  }
}
