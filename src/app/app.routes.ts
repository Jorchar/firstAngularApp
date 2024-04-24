import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlantDetailsComponent } from './plant-details/plant-details.component';

export const routes: Routes = [
{
path: '',
component: HomeComponent,
title: 'Home Page'
},
{
path: 'plant-details/:id',
component: PlantDetailsComponent,
title: 'Plant Details Page'
}
];
