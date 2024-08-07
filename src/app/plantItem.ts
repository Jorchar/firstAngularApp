import {SafeResourceUrl} from "@angular/platform-browser";

export interface PlantItem {
  id: number;
  name: string;
  location: string;
  photo: string;
  wateredDate: string;
  daysBetweenHydrate: number;
  safePhotoUrl: SafeResourceUrl | null;
}
