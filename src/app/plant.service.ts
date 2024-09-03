import { Injectable, inject } from "@angular/core";
import { PlantItem } from "./plantItem";
import { HttpClient } from "@angular/common/http";
import {map, Observable} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
export class PlantService {
  private http = inject(HttpClient);
  private baseUrl = "http://localhost:8080/plant";
  constructor(private sanitizer: DomSanitizer) {}

  getAllPlantItems(): Observable<PlantItem[]> {
    return this.http.get<PlantItem[]>(this.baseUrl).pipe(
      map(plantItems =>
        plantItems.map(plantItem => ({
          ...plantItem,
          safePhotoUrl: this.transformImageToSafeResUrl(plantItem.photo)
        }))
      )
    );
  }

  getPlantItemById(id: Number): Observable<PlantItem> | undefined {
    return this.http.get<PlantItem>(this.baseUrl+"/"+id).pipe(
      map(plantItem => ({
        ...plantItem,
        safePhotoUrl: this.transformImageToSafeResUrl(plantItem.photo)
      }))
    );
  }

  getAllPlantItemsWithoutPhoto(): Observable<PlantItem[]> {
    return this.http.get<PlantItem[]>(this.baseUrl+"/info")
  }

  editPlant(patchedPlant: any): Observable<PlantItem> {
    return this.http.put<PlantItem>(this.baseUrl, patchedPlant);
  }

  addPlant(addedPlant: any): Observable<PlantItem> {
    return this.http.post<PlantItem>(this.baseUrl, addedPlant);
  }

  transformImageToSafeResUrl(image: string | null): SafeResourceUrl | null {
    if (image!="") {
     return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + image);
    } else {
      return null;
    }
  }
}
