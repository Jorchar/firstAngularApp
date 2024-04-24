import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantItem } from '../plantItem';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-plant-item',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './plant-item.component.html',
  styleUrl: './plant-item.component.scss'
})
export class PlantItemComponent {
 @Input() plantItem!:PlantItem;
}
